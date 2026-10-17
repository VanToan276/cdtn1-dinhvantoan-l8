
require('dotenv').config();

const app = require('./app');
const pool = require('./config/db');

const PORT = Number(process.env.PORT || 3000);

async function startServer() {
  try {
    await pool.query('SELECT 1');

    console.log('Kết nối PostgreSQL thành công.');

    app.listen(PORT, () => {
      console.log(`Smart CRM API chạy tại http://localhost:${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('Không thể khởi động ứng dụng:', error.message);
    await pool.end();
    process.exitCode = 1;
  }
}

startServer();
