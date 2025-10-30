Karate + Node.js Backend Integration

📖 Overview

This project combines a Node.js backend and Karate API tests to validate REST endpoints.

Backend: Node.js (Express-based server)

Testing: Karate framework (via Maven)

API Spec: openapi.yaml for reference

🛠️ Prerequisites
Make sure these are installed:

Tool	      Version (minimum)	    Check command

Node.js	       18+	                 node -v

npm	           8+	                   npm -v

Java           17+	               java -version

Maven	         3.8+	                 mvn -v

🚀 Step 1: Open the Project:
File → Open Folder → karate1_merged

💻 Step 2: Install Backend Dependencies
In the VS Code terminal:

cd karate1_merged

npm install

#This installs all required packages listed in package.json.

🧩 Step 3: Start the Backend Server
Run:

node server.js

#If everything works, you should see:
#Server started on http://localhost:3000

🧪 Step 4: Run Karate Tests
In another terminal (while the backend is running):

mvn test

mvn test -Dtest=AllTestsRunner

#This will:
#Start the Karate test runner
#execute .feature files (like health.feature)
#Print results in the console and generate reports under target/karate-reports/

📁 Step 5: Check Reports
After tests run successfully:

Open target/karate-reports/karate-summary.html

Review passed/failed test cases

To check docker file:

Step 1: docker compose up --build

To Re-run:

Step 1: docker compose down

Step 2: docker compose up --build



