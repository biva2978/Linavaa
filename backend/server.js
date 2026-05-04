require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initDb } = require('./db/database');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

initDb();

app.use('/api/auth',      require('./routes/auth'));
app.use('/api/cycle',     require('./routes/cycle'));
app.use('/api/journal',   require('./routes/journal'));
app.use('/api/orders',    require('./routes/orders'));
app.use('/api/providers', require('./routes/providers'));
app.use('/api/content',   require('./routes/content'));
app.use('/api/lina',      require('./routes/lina'));

app.get('/api/health', (_, res) => res.json({ status: 'ok', app: 'Shokhii API' }));

app.use((err, req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => console.log(`Shokhii API running on http://localhost:${PORT}`));
