
const express = require('express');
const cors = require('cors');
const surveyResponseRoutes = require('./routes/surveyResponseRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Smart CRM API đang hoạt động.',
  });
});

app.use('/api/survey-responses', surveyResponseRoutes);

// Xử lý endpoint không tồn tại
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Không tìm thấy API.',
  });
});

// Xử lý lỗi tập trung
app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  if (error.code === '23505') {
    return res.status(409).json({
      success: false,
      message: 'Dữ liệu bị trùng với bản ghi đã tồn tại.',
    });
  }

  if (error.code === '23503') {
    return res.status(400).json({
      success: false,
      message: 'Khóa ngoại không hợp lệ hoặc dữ liệu liên quan không tồn tại.',
    });
  }

  if (error.code === '23514' || error.code === '22P02') {
    return res.status(400).json({
      success: false,
      message: 'Dữ liệu không hợp lệ.',
    });
  }

  const statusCode = error.statusCode || 500;

  if (statusCode >= 500) {
    console.error(error);
  }

  res.status(statusCode).json({
    success: false,
    message:
      statusCode >= 500
        ? 'Lỗi máy chủ. Vui lòng thử lại sau.'
        : error.message,
  });
});

module.exports = app;
