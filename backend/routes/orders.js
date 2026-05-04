const router = require('express').Router();
const { getDb } = require('../db/database');
const { requireAuth } = require('../middleware/auth');

const genOrderNumber = () => 'SHK-' + Math.floor(1000 + Math.random() * 9000);

// GET /api/orders
router.get('/', requireAuth, (req, res) => {
  const rows = getDb().prepare(
    'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC'
  ).all(req.user.userId);
  res.json(rows.map(o => ({ ...o, items: JSON.parse(o.items) })));
});

// POST /api/orders
router.post('/', requireAuth, (req, res) => {
  const { items, area, contact_method, total } = req.body;
  if (!items || !area || total == null) {
    return res.status(400).json({ error: 'items, area, and total required' });
  }

  const db = getDb();
  const orderNumber = genOrderNumber();
  const result = db.prepare(
    'INSERT INTO orders (user_id, order_number, items, area, contact_method, total) VALUES (?, ?, ?, ?, ?, ?)'
  ).run(req.user.userId, orderNumber, JSON.stringify(items), area, contact_method || 'whatsapp', total);

  res.status(201).json({ id: result.lastInsertRowid, order_number: orderNumber, status: 'pending' });
});

// GET /api/orders/:id
router.get('/:id', requireAuth, (req, res) => {
  const order = getDb().prepare(
    'SELECT * FROM orders WHERE id = ? AND user_id = ?'
  ).get(req.params.id, req.user.userId);
  if (!order) return res.status(404).json({ error: 'Not found' });
  res.json({ ...order, items: JSON.parse(order.items) });
});

// PATCH /api/orders/:id/status
router.patch('/:id/status', requireAuth, (req, res) => {
  const { status } = req.body;
  const allowed = ['pending', 'confirmed', 'out_for_delivery', 'delivered', 'cancelled'];
  if (!allowed.includes(status)) return res.status(400).json({ error: 'Invalid status' });
  getDb().prepare('UPDATE orders SET status = ? WHERE id = ? AND user_id = ?').run(status, req.params.id, req.user.userId);
  res.json({ ok: true });
});

module.exports = router;
