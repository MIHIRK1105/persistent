const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const DB_NAME = process.env.DB_NAME || 'data.db';
const TABLE_NAME = process.env.TABLE_NAME || 'records';

// Connect to SQLite database
const db = new sqlite3.Database(path.join(__dirname, DB_NAME), (err) => {
  if (err) console.error('❌ Database connection error:', err.message);
  else console.log(`Connected to SQLite database: ${DB_NAME}`);
});

// Auto-create table if not exists (generic key/value store)
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data TEXT NOT NULL
  )`);
});

// --------------------------
// 1️⃣ Health Check Endpoint
// --------------------------
app.get('/api/v1/health', (req, res) => {
  res.json({ status: 'UP', message: 'Server is healthy' });
});

// --------------------------
// 2️⃣ Create Record (POST)
// --------------------------
app.post('/api/v1/users', (req, res) => {
  const data = JSON.stringify(req.body);
  const sql = `INSERT INTO ${TABLE_NAME} (data) VALUES (?)`;
  db.run(sql, [data], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    const record = { id: this.lastID, ...req.body };
    res.status(201).json(record);
  });
});
// --------------------------
// 2.1️⃣ Get All Records (GET)
// --------------------------
app.get('/api/v1/users', (req, res) => {
  db.all(`SELECT id, data FROM ${TABLE_NAME}`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const users = rows.map(row => ({ id: row.id, ...JSON.parse(row.data) }));
    res.status(200).json(users);
  });
});

// --------------------------
// 3️⃣ Get Record by ID (GET)
// --------------------------
app.get('/api/v1/users/:id', (req, res) => {
  const id = req.params.id;
  db.get(`SELECT data FROM ${TABLE_NAME} WHERE id = ?`, [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Not found' });
    const record = { id:
       Number(id),...JSON.parse(row.data) };
    res.status(200).json(record);
  });
});

// --------------------------
// 4️⃣ Update Record (PUT)
// --------------------------
app.put('/api/v1/users/:id', (req, res) => {
  const id = req.params.id;
  const data = JSON.stringify(req.body);
  const sql = `UPDATE ${TABLE_NAME} SET data = ? WHERE id = ?`;
  db.run(sql, [data, id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Not found' });
    const record = { id: Number(id), ...req.body };
    res.status(200).json(record);
  });
});

// --------------------------
// 5️⃣ Delete Record (DELETE)
// --------------------------
app.delete('/api/v1/users/:id', (req, res) => {
  const id = req.params.id;
  db.get(`SELECT data FROM ${TABLE_NAME} WHERE id = ?`, [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Not found' });

    const record = { id: Number(id), ...JSON.parse(row.data) };
    db.run(`DELETE FROM ${TABLE_NAME} WHERE id = ?`, [id], (delErr) => {
      if (delErr) return res.status(500).json({ error: delErr.message });
      res.status(200).json(record);
    });
  });
});

// --------------------------
// Start Server
// --------------------------
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});