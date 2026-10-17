
const express = require('express');
const service = require('../services/surveyResponseService');

const router = express.Router();

// GET /api/survey-responses
router.get('/', async (req, res, next) => {
  try {
    const data = await service.getAll();
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

// GET /api/survey-responses/:id
router.get('/:id', async (req, res, next) => {
  try {
    const data = await service.getById(req.params.id);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

// POST /api/survey-responses
router.post('/', async (req, res, next) => {
  try {
    const data = await service.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Tạo câu trả lời khảo sát thành công.',
      data,
    });
  } catch (error) {
    next(error);
  }
});

// PUT /api/survey-responses/:id
router.put('/:id', async (req, res, next) => {
  try {
    const data = await service.update(req.params.id, req.body);
    res.json({
      success: true,
      message: 'Cập nhật câu trả lời khảo sát thành công.',
      data,
    });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/survey-responses/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const data = await service.remove(req.params.id);
    res.json({
      success: true,
      message: 'Xóa câu trả lời khảo sát thành công.',
      data,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
