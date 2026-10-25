const express = require('express');
const pool = require('../config/db');
const router = express.Router();

// GET /api/metrics/csat-nps?fromDate=YYYY-MM-DD&toDate=YYYY-MM-DD
router.get('/csat-nps', async (req, res, next) => {
  try {
    const { fromDate, toDate } = req.query;
    const values = [];
    const filters = [];
    if (fromDate) {
      values.push(fromDate);
      filters.push(`sr.responded_at >= $${values.length}::date`);
    }
    if (toDate) {
      values.push(toDate);
      filters.push(`sr.responded_at < ($${values.length}::date + INTERVAL '1 day')`);
    }
    const where = filters.length ? `WHERE ${filters.join(' AND ')}` : '';
    const result = await pool.query(
      `SELECT sr.response_id, sr.csat_score, sr.nps_score, sr.responded_at,
              t.center_id, c.center_name
       FROM survey_response sr
       JOIN survey s ON s.survey_id = sr.survey_id
       JOIN ticket t ON t.ticket_id = s.ticket_id
       JOIN service_center c ON c.center_id = t.center_id
       ${where}
       ORDER BY sr.responded_at ASC`, values
    );
    const rows = result.rows;
    const nps = (items) => {
      if (!items.length) return 0;
      const promoters = items.filter((x) => Number(x.nps_score) >= 9).length;
      const detractors = items.filter((x) => Number(x.nps_score) <= 6).length;
      return Math.round(((promoters - detractors) / items.length) * 100);
    };
    const csat = (items) => items.length
      ? Math.round((items.filter((x) => Number(x.csat_score) >= 4).length / items.length) * 100)
      : 0;
    const byCenterMap = new Map();
    const trendMap = new Map();
    for (const row of rows) {
      if (!byCenterMap.has(row.center_id)) byCenterMap.set(row.center_id, { centerId: row.center_id, centerName: row.center_name, items: [] });
      byCenterMap.get(row.center_id).items.push(row);
      const date = new Date(row.responded_at).toISOString().slice(0, 10);
      if (!trendMap.has(date)) trendMap.set(date, []);
      trendMap.get(date).push(row);
    }
    res.json({
      success: true,
      data: {
        totalResponses: rows.length,
        csat: csat(rows),
        csatUnit: '%',
        nps: nps(rows),
        centerCount: byCenterMap.size,
        byCenter: [...byCenterMap.values()].map(({ centerId, centerName, items }) => ({ centerId, centerName, totalResponses: items.length, csat: csat(items), nps: nps(items) })),
        trend: [...trendMap.entries()].map(([period, items]) => ({ period, csat: csat(items), nps: nps(items) })),
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
