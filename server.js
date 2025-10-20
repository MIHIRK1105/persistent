const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(express.json());

// Create SQLite database in memory
const db = new sqlite3.Database(':memory:');

// Create a sample table
db.serialize(() => {
  db.run("CREATE TABLE users (id INT, name TEXT)");
  db.run("INSERT INTO users (id, name) VALUES (1, 'Preeti')");
  db.run("INSERT INTO users (id, name) VALUES (2, 'John')");
});

// Dummy GET endpoint
app.get('/users', (req, res) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if(err) {
      res.status(500).json({error: err.message});
      return;
    }
    res.json(rows);
  });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server running on http://localhost:3000");
});