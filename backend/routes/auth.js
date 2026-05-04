const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getDb } = require('../db/database');
const { JWT_SECRET } = require('../middleware/auth');

// POST /api/auth/register
router.post('/register', (req, res) => {
  const { phone, pin, name } = req.body;
  if (!phone || !pin) return res.status(400).json({ error: 'phone and pin required' });
  if (!/^\d{4}$/.test(pin)) return res.status(400).json({ error: 'PIN must be exactly 4 digits' });

  const db = getDb();
  const pinHash = bcrypt.hashSync(pin, 10);
  try {
    const result = db.prepare(
      'INSERT INTO users (phone, pin_hash, name) VALUES (?, ?, ?)'
    ).run(phone, pinHash, name || 'Friend');

    const token = jwt.sign({ userId: result.lastInsertRowid, phone }, JWT_SECRET, { expiresIn: '30d' });
    res.status(201).json({ token, user: { id: result.lastInsertRowid, phone, name: name || 'Friend' } });
  } catch (e) {
    if (e.message.includes('UNIQUE')) return res.status(409).json({ error: 'Phone already registered' });
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { phone, pin } = req.body;
  if (!phone || !pin) return res.status(400).json({ error: 'phone and pin required' });

  const user = getDb().prepare('SELECT * FROM users WHERE phone = ?').get(phone);
  if (!user || !bcrypt.compareSync(pin, user.pin_hash)) {
    return res.status(401).json({ error: 'Invalid phone or PIN' });
  }

  const token = jwt.sign({ userId: user.id, phone }, JWT_SECRET, { expiresIn: '30d' });
  res.json({ token, user: { id: user.id, phone: user.phone, name: user.name } });
});

// GET /api/auth/me
router.get('/me', require('../middleware/auth').requireAuth, (req, res) => {
  const user = getDb().prepare('SELECT id, phone, name, created_at FROM users WHERE id = ?').get(req.user.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

module.exports = router;
