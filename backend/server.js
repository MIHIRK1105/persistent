const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(express.json());

// Create SQLite database in memory
const db = new sqlite3.Database(':memory:');

// Create Employee table
db.serialize(() => {
  db.run(`CREATE TABLE employees (
    employeeId TEXT,
    employeeName TEXT,
    managerEmail TEXT,
    enrollmentStatus TEXT,
    enrolledSpecializationName TEXT,
    expectedCompetency TEXT,
    daysToGo INTEGER,
    endDate TEXT
  )`);

  // Insert sample data
  db.run(`INSERT INTO employees 
    (employeeId, employeeName, managerEmail, enrollmentStatus, enrolledSpecializationName, expectedCompetency, daysToGo, endDate)
    VALUES ('E001', 'Preeti', 'manager1@example.com', 'Enrolled', 'Data Science', 'Intermediate', 30, '2025-12-31')`);
  db.run(`INSERT INTO employees 
    (employeeId, employeeName, managerEmail, enrollmentStatus, enrolledSpecializationName, expectedCompetency, daysToGo, endDate)
    VALUES ('E002', 'John', 'manager2@example.com', 'Not Enrolled', 'AI', 'Beginner', 15, '2025-11-30')`);
});

// Dummy GET endpoint for employees
app.get('/api/v1/data/employees', (req, res) => {
  db.all("SELECT * FROM employees", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      success: true,
      message: "Employee data retrieved successfully",
      data: { employees: rows },
      timestamp: new Date().toISOString()
    });
  });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});