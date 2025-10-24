const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(express.json());

// Use file-based SQLite database
const db = new sqlite3.Database('./employees.db', (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});

db.serialize(() => {
  // Create table only if it doesn't exist
  db.run(`CREATE TABLE IF NOT EXISTS employees (
    employeeId TEXT PRIMARY KEY,
    employeeName TEXT,
    managerEmail TEXT,
    enrollmentStatus TEXT,
    enrolledSpecializationName TEXT,
    expectedCompetency TEXT,
    daysToGo INTEGER,
    endDate TEXT
  )`);

  // Insert initial dummy data only if table is empty
  db.get("SELECT COUNT(*) AS count FROM employees", (err, row) => {
    if (err) return console.error(err.message);
    if (row.count === 0) {
      db.run(`INSERT INTO employees 
        (employeeId, employeeName, managerEmail, enrollmentStatus, enrolledSpecializationName, expectedCompetency, daysToGo, endDate)
        VALUES 
        ('E001', 'Preeti', 'manager1@example.com', 'Enrolled', 'Data Science', 'Intermediate', 30, '2025-12-31'),
        ('E002', 'John', 'manager2@example.com', 'Not Enrolled', 'AI', 'Beginner', 15, '2025-11-30')`);
    }
  });
});

// --- GET all employees ---
app.get('/api/v1/data/employees', (req, res) => {
  db.all("SELECT * FROM employees", [], (err, rows) => {
    if (err) return res.status(500).json({ success: false, error: err.message });
    res.json({
      success: true,
      message: "Employee data retrieved successfully",
      data: { employees: rows },
      timestamp: new Date().toISOString()
    });
  });
});

// --- POST new employee ---
app.post('/api/v1/data/employees', (req, res) => {
  const emp = req.body;
  db.run(`INSERT INTO employees 
    (employeeId, employeeName, managerEmail, enrollmentStatus, enrolledSpecializationName, expectedCompetency, daysToGo, endDate)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [emp.employeeId, emp.employeeName, emp.managerEmail, emp.enrollmentStatus, emp.enrolledSpecializationName, emp.expectedCompetency, emp.daysToGo, emp.endDate],
    function(err) {
      if (err) return res.status(500).json({ success: false, error: err.message });
      res.json({ success: true, message: "Employee added successfully", timestamp: new Date().toISOString() });
    }
  );
});

// --- PUT to update an employee ---
app.put('/api/v1/data/employees/:id', (req, res) => {
  const id = req.params.id;
  const emp = req.body;
  db.run(`UPDATE employees SET
    employeeName = ?, 
    managerEmail = ?, 
    enrollmentStatus = ?, 
    enrolledSpecializationName = ?, 
    expectedCompetency = ?, 
    daysToGo = ?, 
    endDate = ? 
    WHERE employeeId = ?`,
    [emp.employeeName, emp.managerEmail, emp.enrollmentStatus, emp.enrolledSpecializationName, emp.expectedCompetency, emp.daysToGo, emp.endDate, id],
    function(err) {
      if (err) return res.status(500).json({ success: false, error: err.message });
      res.json({ success: true, message: "Employee updated successfully", timestamp: new Date().toISOString() });
    }
  );
});

// --- DELETE an employee ---
app.delete('/api/v1/data/employees/:id', (req, res) => {
  const id = req.params.id;
  db.run(
    "DELETE FROM employees WHERE employeeId = ?",
    [id],
    function(err) {
      if (err) return res.status(500).json({ success: false, error: err.message });
      res.json({ success: true, message: "Employee deleted successfully", timestamp: new Date().toISOString() });
    }
  );
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));