const express = require('express');
const app = express();
app.use(express.json());

// Dummy data
const employees = [
  {
    employeeId: "E001",
    employeeName: "Preeti",
    managerEmail: "manager1@example.com",
    enrollmentStatus: "Enrolled",
    enrolledSpecializationName: "Data Science",
    expectedCompetency: "Intermediate",
    daysToGo: 30,
    endDate: "2025-12-31"
  },
  {
    employeeId: "E002",
    employeeName: "John",
    managerEmail: "manager2@example.com",
    enrollmentStatus: "Not Enrolled",
    enrolledSpecializationName: "AI",
    expectedCompetency: "Beginner",
    daysToGo: 15,
    endDate: "2025-11-30"
  }
];

const managers = [
  {
    managerId: "M001",
    managerEmail: "manager1@example.com",
    managerName: "Alice",
    level: "L1",
    reportees: [employees[0]]
  },
  {
    managerId: "M002",
    managerEmail: "manager2@example.com",
    managerName: "Bob",
    level: "L2",
    reportees: [employees[1]]
  }
];

const emailTemplates = [
  {
    templateId: "T001",
    templateName: "Reminder Template",
    subject: "Reminder",
    body: "This is a reminder email.",
    type: "reminder",
    level: "L1"
  }
];

const emailLogs = [
  {
    logId: "L001",
    recipientEmail: "preeti@example.com",
    subject: "Reminder",
    sentDate: new Date(),
    emailType: "reminder",
    status: "sent",
    managerId: "M001",
    employeeCount: 1
  }
];

// --- API Endpoints ---

// GET all employees
app.get('/api/v1/data/employees', (req, res) => {
  res.json({
    success: true,
    message: "Employee data retrieved successfully",
    data: { employees },
    timestamp: new Date().toISOString()
  });
});

// GET employee by ID
app.get('/api/v1/data/employees/:id', (req, res) => {
  const emp = employees.find(e => e.employeeId === req.params.id);
  if (!emp) return res.status(404).json({ success: false, error: "Employee not found" });
  res.json({ success: true, data: emp, timestamp: new Date().toISOString() });
});

// GET all managers
app.get('/api/v1/data/managers', (req, res) => {
  res.json({ success: true, data: managers, timestamp: new Date().toISOString() });
});

// GET all email templates
app.get('/api/v1/data/email-templates', (req, res) => {
  res.json({ success: true, data: emailTemplates, timestamp: new Date().toISOString() });
});

// GET all email logs
app.get('/api/v1/data/email-logs', (req, res) => {
  res.json({ success: true, data: emailLogs, timestamp: new Date().toISOString() });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});