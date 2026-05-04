const router = require('express').Router();
const { getDb } = require('../db/database');
const { requireAuth } = require('../middleware/auth');

// GET /api/journal  — list (preview only, no full content)
router.get('/', requireAuth, (req, res) => {
  const rows = getDb().prepare(`
    SELECT id, date, mood,
           substr(content, 1, 80) || CASE WHEN length(content) > 80 THEN '…' ELSE '' END AS preview,
           created_at
    FROM journal_entries WHERE user_id = ?
    ORDER BY date DESC LIMIT 50
  `).all(req.user.userId);
  res.json(rows);
});

// POST /api/journal
router.post('/', requireAuth, (req, res) => {
  const { date, content, mood } = req.body;
  if (!date || !content?.trim()) return res.status(400).json({ error: 'date and content required' });

  const result = getDb().prepare(
    'INSERT INTO journal_entries (user_id, date, content, mood) VALUES (?, ?, ?, ?)'
  ).run(req.user.userId, date, content, mood || '🙂');

  res.status(201).json({ id: result.lastInsertRowid });
});

// GET /api/journal/:id  — full content
router.get('/:id', requireAuth, (req, res) => {
  const entry = getDb().prepare(
    'SELECT * FROM journal_entries WHERE id = ? AND user_id = ?'
  ).get(req.params.id, req.user.userId);
  if (!entry) return res.status(404).json({ error: 'Not found' });
  res.json(entry);
});

// DELETE /api/journal/:id
router.delete('/:id', requireAuth, (req, res) => {
  getDb().prepare('DELETE FROM journal_entries WHERE id = ? AND user_id = ?').run(req.params.id, req.user.userId);
  res.json({ ok: true });
});

module.exports = router;
