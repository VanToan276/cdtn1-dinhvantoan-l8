
require('dotenv').config();

const pool = require('../src/config/db');

async function seed() {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // 1. Trung tâm dịch vụ
    let result = await client.query(
      `SELECT center_id FROM service_center
       WHERE center_name = $1 LIMIT 1`,
      ['Trung tâm Mekong']
    );

    let centerId;

    if (result.rows.length > 0) {
      centerId = result.rows[0].center_id;
    } else {
      result = await client.query(
        `INSERT INTO service_center (center_name, address)
         VALUES ($1, $2) RETURNING center_id`,
        ['Trung tâm Mekong', 'Cần Thơ']
      );
      centerId = result.rows[0].center_id;
    }

    // 2. Khách hàng
    result = await client.query(
      `INSERT INTO customer (full_name, phone, email)
       VALUES ($1, $2, $3)
       ON CONFLICT (phone) DO UPDATE
       SET full_name = EXCLUDED.full_name,
           email = EXCLUDED.email
       RETURNING customer_id`,
      ['Nguyễn Minh Anh', '0900000001', 'minhanh@example.com']
    );

    const customerId = result.rows[0].customer_id;

    // 3. Kỹ thuật viên
    result = await client.query(
      `SELECT technician_id FROM technician
       WHERE center_id = $1 AND full_name = $2 LIMIT 1`,
      [centerId, 'Trần Văn Bình']
    );

    let technicianId;

    if (result.rows.length > 0) {
      technicianId = result.rows[0].technician_id;
    } else {
      result = await client.query(
        `INSERT INTO technician (center_id, full_name)
         VALUES ($1, $2) RETURNING technician_id`,
        [centerId, 'Trần Văn Bình']
      );
      technicianId = result.rows[0].technician_id;
    }

    // 4. Phiếu bảo hành đã đóng
    result = await client.query(
      `INSERT INTO ticket
         (ticket_code, customer_id, center_id, technician_id,
          status, closed_at)
       VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)
       ON CONFLICT (ticket_code) DO UPDATE
       SET status = EXCLUDED.status
       RETURNING ticket_id`,
      ['TKT-L8-0001', customerId, centerId, technicianId, 'CLOSED']
    );

    const ticketId = result.rows[0].ticket_id;

    // 5. Khảo sát
    result = await client.query(
      `INSERT INTO survey
         (ticket_id, survey_token, sent_at, expires_at, status)
       VALUES ($1, $2, CURRENT_TIMESTAMP,
               CURRENT_TIMESTAMP + INTERVAL '30 days', $3)
       ON CONFLICT (ticket_id) DO UPDATE
       SET status = EXCLUDED.status
       RETURNING survey_id`,
      [ticketId, 'SURVEY-L8-0001', 'RESPONDED']
    );

    const surveyId = result.rows[0].survey_id;

    // 6. Câu trả lời khảo sát
    await client.query(
      `INSERT INTO survey_response
         (survey_id, csat_score, nps_score, comment)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (survey_id) DO UPDATE
       SET csat_score = EXCLUDED.csat_score,
           nps_score = EXCLUDED.nps_score,
           comment = EXCLUDED.comment`,
      [surveyId, 5, 9, 'Dịch vụ tốt, nhân viên hỗ trợ nhiệt tình.']
    );

    await client.query('COMMIT');
    console.log('Seed thành công: đã có dữ liệu Smart CRM mẫu.');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Seed thất bại:', error.message);
    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
}

seed().catch((error) => {
  console.error('Không thể chạy seed:', error.message);
  process.exitCode = 1;
});
