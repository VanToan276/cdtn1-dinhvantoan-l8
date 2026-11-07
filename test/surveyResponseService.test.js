const test = require('node:test');
const assert = require('node:assert/strict');
const serviceModule = require('../src/services/surveyResponseService');

function makeService({ surveyRows = [{ survey_id: 7, status: 'SENT', expires_at: '2099-01-01T00:00:00.000Z' }], created = { response_id: 12 } } = {}) {
  const calls = { queries: [], create: [] };
  const repository = {
    findAll: async () => [], findById: async () => null,
    create: async (data) => { calls.create.push(data); return created; },
    update: async () => null, remove: async () => null,
  };
  const pool = { query: async (sql, params) => { calls.queries.push({ sql, params }); return { rows: surveyRows }; } };
  return { service: serviceModule.createSurveyResponseService({ repository, pool }), calls };
}

test('validateResponse accepts minimum CSAT=1 and NPS=0 (boundary)', () => {
  assert.doesNotThrow(() => serviceModule.validateResponse({ survey_id: 1, csat_score: 1, nps_score: 0 }, true));
});

test('validateResponse accepts maximum CSAT=5 and NPS=10 (boundary)', () => {
  assert.doesNotThrow(() => serviceModule.validateResponse({ survey_id: 1, csat_score: 5, nps_score: 10 }, true));
});

test('validateResponse rejects CSAT outside 1..5', () => {
  assert.throws(() => serviceModule.validateResponse({ survey_id: 1, csat_score: 6, nps_score: 8 }, true), { statusCode: 400, message: /csat_score/ });
});

test('validateResponse rejects NPS outside 0..10', () => {
  assert.throws(() => serviceModule.validateResponse({ survey_id: 1, csat_score: 4, nps_score: 11 }, true), { statusCode: 400, message: /nps_score/ });
});

test('create accepts valid ticket_code and saves normalized scores', async () => {
  const { service, calls } = makeService();
  const result = await service.create({ ticket_code: ' TKT-L8-0002 ', csat_score: '5', nps_score: '10', comment: 'Rất tốt' });
  assert.equal(result.response_id, 12);
  assert.deepEqual(calls.create, [{ survey_id: 7, csat_score: 5, nps_score: 10, comment: 'Rất tốt' }]);
  assert.deepEqual(calls.queries[0].params, ['TKT-L8-0002']);
});

test('create rejects survey not in SENT state (exception flow)', async () => {
  const { service } = makeService({ surveyRows: [{ survey_id: 7, status: 'RESPONDED', expires_at: '2099-01-01T00:00:00.000Z' }] });
  await assert.rejects(service.create({ survey_id: 7, csat_score: 4, nps_score: 8 }), { statusCode: 409, message: /SENT/ });
});

test('create rejects an expired survey', async () => {
  const { service } = makeService({ surveyRows: [{ survey_id: 7, status: 'SENT', expires_at: '2000-01-01T00:00:00.000Z' }] });
  await assert.rejects(service.create({ survey_id: 7, csat_score: 4, nps_score: 8 }), { statusCode: 409, message: /hết hạn/ });
});

test('getById rejects invalid ID before querying repository', async () => {
  const { service } = makeService();
  await assert.rejects(service.getById('abc'), { statusCode: 400, message: /số nguyên dương/ });
});
