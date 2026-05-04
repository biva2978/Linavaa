const router = require('express').Router();
const Anthropic = require('@anthropic-ai/sdk');
const { getDb } = require('../db/database');
const { requireAuth } = require('../middleware/auth');

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const LINA_SYSTEM = `You are Lina, Shokhii's warm and knowledgeable AI companion — a trusted girlfriend who happens to know a lot about women's health.

Shokhii ("শখী") means "female friend" in Bangla. You are built for women in Bangladesh.

Your personality:
- Warm, gentle, non-judgmental — like a caring older sister
- Practical and grounded, not clinical or preachy
- Respectful of privacy; never ask for more personal detail than needed
- You understand the social context: shared phones, family pressure, limited access to healthcare, stigma around periods

What you help with:
- Menstrual cycle questions (phases, symptoms, irregularities)
- PMS, PCOS, endometriosis — explaining conditions in plain language
- Period pain relief (home remedies, when to see a doctor)
- Nutrition advice relevant to Bangladesh (dal, spinach, jaggery, fish)
- Mental health during the cycle (mood swings, anxiety, low energy)
- Reproductive health basics
- How to use Shokhii's features (cycle tracking, log, journal, pad delivery)

Hard rules:
- Never diagnose. Always recommend seeing a doctor for persistent or severe symptoms.
- Never shame. Periods are normal. Bodies are different.
- Keep responses concise — 2–4 short paragraphs max unless the user asks for more detail.
- If the user writes in Bangla, respond in Bangla.
- Do not discuss topics unrelated to women's health and wellness.
- If asked something dangerous or beyond your scope, say so kindly and suggest professional help.

Opening if it's the first message: greet warmly as Lina and ask how you can help today.`;

// POST /api/lina/chat
// Body: { message: string, history?: [{ role, content }] }
router.post('/chat', requireAuth, async (req, res) => {
  const { message, history = [] } = req.body;
  if (!message?.trim()) return res.status(400).json({ error: 'message required' });

  const db = getDb();

  // Persist user message
  db.prepare('INSERT INTO lina_messages (user_id, role, content) VALUES (?, ?, ?)').run(req.user.userId, 'user', message);

  // Build messages array — include up to last 20 exchanges for context
  const past = db.prepare(
    'SELECT role, content FROM lina_messages WHERE user_id = ? ORDER BY created_at DESC LIMIT 40'
  ).all(req.user.userId).reverse();

  // Dedupe: if client sent history, use that; otherwise use DB history
  const messages = (history.length > 0 ? history : past.slice(0, -1))
    .map(m => ({ role: m.role, content: m.content }));
  messages.push({ role: 'user', content: message });

  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: [
        {
          type: 'text',
          text: LINA_SYSTEM,
          cache_control: { type: 'ephemeral' },
        },
      ],
      messages,
    });

    const reply = response.content[0].text;

    // Persist assistant reply
    db.prepare('INSERT INTO lina_messages (user_id, role, content) VALUES (?, ?, ?)').run(req.user.userId, 'assistant', reply);

    res.json({
      reply,
      usage: {
        input_tokens: response.usage.input_tokens,
        output_tokens: response.usage.output_tokens,
        cache_read_tokens: response.usage.cache_read_input_tokens ?? 0,
        cache_creation_tokens: response.usage.cache_creation_input_tokens ?? 0,
      },
    });
  } catch (e) {
    console.error('Lina API error:', e.message);
    res.status(502).json({ error: 'Lina is unavailable right now. Please try again shortly.' });
  }
});

// GET /api/lina/history  — last 50 messages
router.get('/history', requireAuth, (req, res) => {
  const rows = getDb().prepare(
    'SELECT id, role, content, created_at FROM lina_messages WHERE user_id = ? ORDER BY created_at ASC LIMIT 50'
  ).all(req.user.userId);
  res.json(rows);
});

// DELETE /api/lina/history  — clear conversation
router.delete('/history', requireAuth, (req, res) => {
  getDb().prepare('DELETE FROM lina_messages WHERE user_id = ?').run(req.user.userId);
  res.json({ ok: true });
});

module.exports = router;
