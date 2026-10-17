
require('dotenv').config();

const fs = require('node:fs/promises');
const path = require('node:path');
const { Pool } = require('pg');

async function migrate() {
  const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 5432),
    database: process.env.DB_NAME || 'smart_crm_l8',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD,
  });

  const client = await pool.connect();

  try {
    const migrationPath = path.join(
      __dirname,
      'migrations',
      '001_initial_schema.sql'
    );

    const sql = await fs.readFile(migrationPath, 'utf8');

    await client.query('BEGIN');
    await client.query(sql);
    await client.query('COMMIT');

    console.log('Migration thành công: đã tạo các bảng Smart CRM.');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Migration thất bại:', error.message);
    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
}

migrate().catch((error) => {
  console.error('Không thể chạy migration:', error.message);
  process.exitCode = 1;
});
