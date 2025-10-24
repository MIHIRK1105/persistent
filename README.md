
# Dummy Backend API

This is a dummy backend API for employee management. It supports *GET, POST, PUT, and DELETE* operations on employee data. The backend uses *Node.js, Express, and SQLite* database.

---

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/en/download/) (v18+ recommended)  
- [npm](https://www.npmjs.com/get-npm) (comes with Node.js)  
- SQLite (for database inspection) or [DB Browser for SQLite](https://sqlitebrowser.org/)

---

## Setup Instructions

1. *Clone the repository*

```bash
git clone https://github.com/MIHIRK1105/persistent.git

2. Navigate to the backend folder



cd backend

3. Install dependencies



npm install

4. Start the server



node server.js

The server will run on:

http://localhost:3000


---

API Endpoints

Endpoint	Method	Body	Response	Description

/api/v1/data/employees	GET	None	{ "success": true, "message": "...", "data": { "employees": [...] }, "timestamp": "..." }	Fetch all employees
/api/v1/data/employees	POST	{ "employeeId": "E003", "employeeName": "John", "managerEmail": "...", "enrollmentStatus": "...", "enrolledSpecializationName": "...", "expectedCompetency": "...", "daysToGo": 15, "endDate": "2025-11-30" }	{ "success": true, "message": "Employee added successfully", "timestamp": "..." }	Add a new employee
/api/v1/data/employees/:id	PUT	Same structure as POST	{ "success": true, "message": "Employee updated successfully", "timestamp": "..." }	Update an existing employee
/api/v1/data/employees/:id	DELETE	None	{ "success": true, "message": "Employee deleted successfully", "timestamp": "..." }	Delete an employee by ID



---

Notes

The database is SQLite file-based (employees.db) and persists data across server restarts.

You can inspect the database using DB Browser for SQLite.

The code is generic: you can insert, update, delete, or fetch any employee data dynamically.

Replace :id in PUT and DELETE endpoints with the employeeId of the employee you want to update or delete.



---

Example Requests

GET all employees

curl -X GET http://localhost:3000/api/v1/data/employees

POST new employee

curl -X POST http://localhost:3000/api/v1/data/employees \
-H "Content-Type: application/json" \
-d '{
  "employeeId": "E003",
  "employeeName": "John",
  "managerEmail": "manager2@example.com",
  "enrollmentStatus": "Enrolled",
  "enrolledSpecializationName": "AI",
  "expectedCompetency": "Beginner",
  "daysToGo": 15,
  "endDate": "2025-11-30"
}'

PUT update employee

curl -X PUT http://localhost:3000/api/v1/data/employees/E003 \
-H "Content-Type: application/json" \
-d '{ "employeeName": "John Doe", "managerEmail": "manager3@example.com", ... }'

DELETE employee

curl -X DELETE http://localhost:3000/api/v1/data/employees/E003
