CREATE TABLE IF NOT EXISTS users (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  phone       TEXT UNIQUE NOT NULL,
  pin_hash    TEXT NOT NULL,
  name        TEXT DEFAULT 'Friend',
  created_at  TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS cycle_settings (
  user_id         INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  cycle_length    INTEGER DEFAULT 28,
  period_length   INTEGER DEFAULT 5,
  last_period_start TEXT,
  updated_at      TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS cycle_logs (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date        TEXT NOT NULL,
  day_in_cycle INTEGER,
  flow        TEXT,
  mood        TEXT,
  pain        TEXT,
  energy      TEXT,
  sleep       TEXT,
  note        TEXT,
  medications TEXT DEFAULT '{}',
  created_at  TEXT DEFAULT (datetime('now')),
  UNIQUE(user_id, date)
);

CREATE TABLE IF NOT EXISTS journal_entries (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date        TEXT NOT NULL,
  content     TEXT NOT NULL,
  mood        TEXT DEFAULT '🙂',
  created_at  TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS orders (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id        INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  order_number   TEXT NOT NULL,
  items          TEXT NOT NULL,
  area           TEXT NOT NULL,
  contact_method TEXT DEFAULT 'whatsapp',
  total          INTEGER NOT NULL,
  status         TEXT DEFAULT 'pending',
  created_at     TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS lina_messages (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role        TEXT NOT NULL CHECK(role IN ('user','assistant')),
  content     TEXT NOT NULL,
  created_at  TEXT DEFAULT (datetime('now'))
);
