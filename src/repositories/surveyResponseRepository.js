
const pool = require('../config/db');

async function findAll() {
  const result = await pool.query(`
    SELECT
      sr.response_id,
      sr.survey_id,
      sr.csat_score,
      sr.nps_score,
      sr.comment,
      sr.responded_at,
      s.survey_token,
      t.ticket_code,
      c.center_name,
      tech.full_name AS technician_name
    FROM survey_response sr
    JOIN survey s ON s.survey_id = sr.survey_id
    JOIN ticket t ON t.ticket_id = s.ticket_id
    JOIN service_center c ON c.center_id = t.center_id
    LEFT JOIN technician tech
      ON tech.technician_id = t.technician_id
    ORDER BY sr.response_id DESC
  `);

  return result.rows;
}

async function findById(id) {
  const result = await pool.query(
    `SELECT *
     FROM survey_response
     WHERE response_id = $1`,
    [id]
  );

  return result.rows[0] || null;
}

async function create(data) {
  const result = await pool.query(
    `INSERT INTO survey_response
       (survey_id, csat_score, nps_score, comment)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [data.survey_id, data.csat_score, data.nps_score, data.comment ?? null]
  );

  await pool.query(
    `UPDATE survey SET status = 'RESPONDED'
     WHERE survey_id = $1`,
    [data.survey_id]
  );

  return result.rows[0];
}

async function update(id, data) {
  const result = await pool.query(
    `UPDATE survey_response
     SET csat_score = $1,
         nps_score = $2,
         comment = $3
     WHERE response_id = $4
     RETURNING *`,
    [data.csat_score, data.nps_score, data.comment ?? null, id]
  );

  return result.rows[0] || null;
}

async function remove(id) {
  const result = await pool.query(
    `DELETE FROM survey_response
     WHERE response_id = $1
     RETURNING *`,
    [id]
  );

  return result.rows[0] || null;
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
