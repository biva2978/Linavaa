const router = require('express').Router();
const { getDb } = require('../db/database');
const { requireAuth } = require('../middleware/auth');

// GET /api/cycle/settings
router.get('/settings', requireAuth, (req, res) => {
  const row = getDb().prepare('SELECT * FROM cycle_settings WHERE user_id = ?').get(req.user.userId);
  res.json(row || { cycle_length: 28, period_length: 5, last_period_start: null });
});

// PUT /api/cycle/settings
router.put('/settings', requireAuth, (req, res) => {
  const { cycle_length = 28, period_length = 5, last_period_start = null } = req.body;
  getDb().prepare(`
    INSERT INTO cycle_settings (user_id, cycle_length, period_length, last_period_start, updated_at)
    VALUES (?, ?, ?, ?, datetime('now'))
    ON CONFLICT(user_id) DO UPDATE SET
      cycle_length = excluded.cycle_length,
      period_length = excluded.period_length,
      last_period_start = excluded.last_period_start,
      updated_at = excluded.updated_at
  `).run(req.user.userId, cycle_length, period_length, last_period_start);
  res.json({ ok: true });
});

// GET /api/cycle/logs?from=YYYY-MM-DD&to=YYYY-MM-DD
router.get('/logs', requireAuth, (req, res) => {
  const { from, to } = req.query;
  const db = getDb();
  const rows = from && to
    ? db.prepare('SELECT * FROM cycle_logs WHERE user_id = ? AND date BETWEEN ? AND ? ORDER BY date DESC').all(req.user.userId, from, to)
    : db.prepare('SELECT * FROM cycle_logs WHERE user_id = ? ORDER BY date DESC LIMIT 90').all(req.user.userId);

  res.json(rows.map(r => ({ ...r, medications: JSON.parse(r.medications || '{}') })));
});

// POST /api/cycle/logs  (upsert by date)
router.post('/logs', requireAuth, (req, res) => {
  const { date, day_in_cycle, flow, mood, pain, energy, sleep, note, medications } = req.body;
  if (!date) return res.status(400).json({ error: 'date required' });

  getDb().prepare(`
    INSERT INTO cycle_logs (user_id, date, day_in_cycle, flow, mood, pain, energy, sleep, note, medications)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(user_id, date) DO UPDATE SET
      day_in_cycle = excluded.day_in_cycle,
      flow = excluded.flow, mood = excluded.mood, pain = excluded.pain,
      energy = excluded.energy, sleep = excluded.sleep,
      note = excluded.note, medications = excluded.medications
  `).run(req.user.userId, date, day_in_cycle ?? null, flow ?? null, mood ?? null,
         pain ?? null, energy ?? null, sleep ?? null, note ?? null,
         JSON.stringify(medications || {}));

  res.json({ ok: true });
});

// DELETE /api/cycle/logs/:date
router.delete('/logs/:date', requireAuth, (req, res) => {
  getDb().prepare('DELETE FROM cycle_logs WHERE user_id = ? AND date = ?').run(req.user.userId, req.params.date);
  res.json({ ok: true });
});

module.exports = router;
