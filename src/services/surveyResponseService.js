
function httpError(statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function validateId(id) {
  if (!Number.isInteger(Number(id)) || Number(id) < 1) {
    throw httpError(400, 'ID phải là số nguyên dương.');
  }
}

function validateResponse(data = {}, isCreate = false) {
  const errors = [];
  if (isCreate) {
    const hasSurveyId = Number.isInteger(Number(data.survey_id)) && Number(data.survey_id) > 0;
    const hasTicketCode = typeof data.ticket_code === 'string' && data.ticket_code.trim().length > 0;
    if (!hasSurveyId && !hasTicketCode) errors.push('Cần cung cấp survey_id hợp lệ hoặc ticket_code.');
  }
  if (!Number.isInteger(Number(data.csat_score)) || Number(data.csat_score) < 1 || Number(data.csat_score) > 5) {
    errors.push('csat_score phải là số nguyên từ 1 đến 5.');
  }
  if (!Number.isInteger(Number(data.nps_score)) || Number(data.nps_score) < 0 || Number(data.nps_score) > 10) {
    errors.push('nps_score phải là số nguyên từ 0 đến 10.');
  }
  if (data.comment !== undefined && data.comment !== null && typeof data.comment !== 'string') {
    errors.push('comment phải là chuỗi hoặc null.');
  }
  if (errors.length) throw httpError(400, errors.join(' '));
}

function createSurveyResponseService({ repository, pool } = {}) {
  repository = repository || require('../repositories/surveyResponseRepository');
  pool = pool || require('../config/db');
  async function getAll() { return repository.findAll(); }

  async function getById(id) {
    validateId(id);
    const response = await repository.findById(Number(id));
    if (!response) throw httpError(404, 'Không tìm thấy câu trả lời khảo sát.');
    return response;
  }

  async function create(data) {
    validateResponse(data, true);
    let surveyResult;
    if (data.ticket_code && !data.survey_id) {
      surveyResult = await pool.query(
        `SELECT s.survey_id, s.status, s.expires_at
         FROM survey s JOIN ticket t ON t.ticket_id = s.ticket_id
         WHERE UPPER(t.ticket_code) = UPPER($1)`,
        [data.ticket_code.trim()]
      );
    } else {
      surveyResult = await pool.query(
        `SELECT survey_id, status, expires_at FROM survey WHERE survey_id = $1`,
        [Number(data.survey_id)]
      );
    }
    if (!surveyResult.rows.length) throw httpError(404, data.ticket_code ? 'Không tìm thấy khảo sát cho mã phiếu bảo hành này.' : 'Khảo sát không tồn tại.');
    const survey = surveyResult.rows[0];
    if (survey.status !== 'SENT') throw httpError(409, 'Chỉ khảo sát đang ở trạng thái SENT mới nhận câu trả lời.');
    if (!survey.expires_at || new Date(survey.expires_at) <= new Date()) throw httpError(409, 'Khảo sát đã hết hạn.');
    return repository.create({
      survey_id: Number(survey.survey_id),
      csat_score: Number(data.csat_score),
      nps_score: Number(data.nps_score),
      comment: data.comment ?? null,
    });
  }

  async function update(id, data) {
    validateId(id);
    validateResponse(data);
    const response = await repository.update(Number(id), {
      csat_score: Number(data.csat_score), nps_score: Number(data.nps_score), comment: data.comment ?? null,
    });
    if (!response) throw httpError(404, 'Không tìm thấy câu trả lời khảo sát.');
    return response;
  }

  async function remove(id) {
    validateId(id);
    const response = await repository.remove(Number(id));
    if (!response) throw httpError(404, 'Không tìm thấy câu trả lời khảo sát.');
    return response;
  }

  return { getAll, getById, create, update, remove };
}

let defaultService;
function getDefaultService() {
  if (!defaultService) defaultService = createSurveyResponseService();
  return defaultService;
}

module.exports = {
  createSurveyResponseService,
  validateResponse,
  validateId,
  getAll: (...args) => getDefaultService().getAll(...args),
  getById: (...args) => getDefaultService().getById(...args),
  create: (...args) => getDefaultService().create(...args),
  update: (...args) => getDefaultService().update(...args),
  remove: (...args) => getDefaultService().remove(...args),
};
