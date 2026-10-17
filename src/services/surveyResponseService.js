
const repository = require('../repositories/surveyResponseRepository');
const pool = require('../config/db');

function validateId(id) {
  if (!Number.isInteger(Number(id)) || Number(id) < 1) {
    const error = new Error('ID phải là số nguyên dương.');
    error.statusCode = 400;
    throw error;
  }
}

function validateResponse(data, isCreate = false) {
  const errors = [];

  if (
    isCreate &&
    (!Number.isInteger(Number(data.survey_id)) ||
      Number(data.survey_id) < 1)
  ) {
    errors.push('survey_id phải là số nguyên dương.');
  }

  if (
    !Number.isInteger(Number(data.csat_score)) ||
    Number(data.csat_score) < 1 ||
    Number(data.csat_score) > 5
  ) {
    errors.push('csat_score phải là số nguyên từ 1 đến 5.');
  }

  if (
    !Number.isInteger(Number(data.nps_score)) ||
    Number(data.nps_score) < 0 ||
    Number(data.nps_score) > 10
  ) {
    errors.push('nps_score phải là số nguyên từ 0 đến 10.');
  }

  if (
    data.comment !== undefined &&
    data.comment !== null &&
    typeof data.comment !== 'string'
  ) {
    errors.push('comment phải là chuỗi hoặc null.');
  }

  if (errors.length > 0) {
    const error = new Error(errors.join(' '));
    error.statusCode = 400;
    throw error;
  }
}

async function getAll() {
  return repository.findAll();
}

async function getById(id) {
  validateId(id);

  const response = await repository.findById(Number(id));

  if (!response) {
    const error = new Error('Không tìm thấy câu trả lời khảo sát.');
    error.statusCode = 404;
    throw error;
  }

  return response;
}

async function create(data) {
  validateResponse(data, true);

  const survey = await pool.query(
    `SELECT survey_id, status, expires_at
     FROM survey
     WHERE survey_id = $1`,
    [Number(data.survey_id)]
  );

  if (survey.rows.length === 0) {
    const error = new Error('Khảo sát không tồn tại.');
    error.statusCode = 404;
    throw error;
  }

  const surveyData = survey.rows[0];

  if (surveyData.status !== 'SENT') {
    const error = new Error(
      'Chỉ khảo sát đang ở trạng thái SENT mới nhận câu trả lời.'
    );
    error.statusCode = 409;
    throw error;
  }

  if (new Date(surveyData.expires_at) <= new Date()) {
    const error = new Error('Khảo sát đã hết hạn.');
    error.statusCode = 409;
    throw error;
  }

  return repository.create({
    survey_id: Number(data.survey_id),
    csat_score: Number(data.csat_score),
    nps_score: Number(data.nps_score),
    comment: data.comment ?? null,
  });
}

async function update(id, data) {
  validateId(id);
  validateResponse(data);

  const response = await repository.update(Number(id), {
    csat_score: Number(data.csat_score),
    nps_score: Number(data.nps_score),
    comment: data.comment ?? null,
  });

  if (!response) {
    const error = new Error('Không tìm thấy câu trả lời khảo sát.');
    error.statusCode = 404;
    throw error;
  }

  return response;
}

async function remove(id) {
  validateId(id);

  const response = await repository.remove(Number(id));

  if (!response) {
    const error = new Error('Không tìm thấy câu trả lời khảo sát.');
    error.statusCode = 404;
    throw error;
  }

  return response;
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
