# Dummy Backend with Karate API Tests

## Project Overview
This project is a dummy backend server using *SQLite* for data storage and running on *port 3000. It is integrated with *Karate for automated API testing and supports full CRUD operations for users.

## Server Setup
1. Navigate to the backend directory:  
   ```bash
   cd C:/Users/Admin/Desktop/dummy-backend/backend

2. Install dependencies (if any):

npm install


3. Start the server on port 3000:

node server.js


4. The backend is now running at:

http://localhost:3000/api/v1

and is connected to the SQLite database employees.db.



Karate Tests

Test files are located in:

C:/Users/Admin/Desktop/dummy-backend/test/karate1_merged/karate1_merged/target/test-classes/tests/

To run all tests, use:

java -jar karate-1.5.1.jar -T 1 -o target/test-classes/tests <path-to-feature-files>

Key feature files:

health.feature – Checks server health.

user-crud.feature – Full CRUD flow for User API.


Test Reports

After running Karate tests, the report is generated here:

C:/Users/Admin/Desktop/dummy-backend/test/karate1_merged/karate1_merged/target/test-classes/tests/target/karate-reports/karate-summary.html

Open the HTML file in a browser to view the test summary.

Notes

Base URL for API is set in karate-config.js.

Ensure the backend server is running before executing the tests.

The server uses employees.db as the SQLite database.

