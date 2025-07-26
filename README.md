🔒 Table Reservation Lock API
This project implements a simple RESTful API designed to manage temporary table availability by "locking" a table while a user completes their booking. This mechanism is crucial for preventing simultaneous double-bookings, ensuring a smooth reservation process.

🎯 The Scenario
To manage table availability effectively, a system is required to temporarily "lock" a table while a user completes their booking. This mechanism is crucial for preventing simultaneous double-bookings of the same table. This API provides the core logic for this functionality.

✨ Features
Temporary Table Locking: Allows a user to temporarily reserve a table for a specified duration.

Conflict Prevention: Prevents other users from locking an already locked table.

Controlled Unlocking: Ensures only the user who locked a table can unlock it.

Lock Status Check: Provides real-time status of a table's lock, including expiry.

💻 Tech Stack
Node.js: JavaScript runtime environment.

Express.js: Fast, unopinionated, minimalist web framework for Node.js.

In-memory Data Store: A simple JavaScript object or array is used to store lock records, eliminating the need for an external database setup for this core logic.

🚀 API Endpoints
The API provides the following endpoints to facilitate the temporary reservation of tables:

1. POST /api/tables/lock
Locks a specified table for a given duration.

Description: Attempts to place a temporary lock on a table. If the table is already locked by another user, it returns a conflict.

Request Body:

{
  "tableId": "string",  // Unique identifier for the table (e.g., "table-123")
  "userId": "string",   // Unique identifier for the user (e.g., "user-abc")
  "duration": 600       // Duration of the lock in seconds (e.g., 600 seconds = 10 minutes)
}

Logic:

Verify if the tableId is already subject to an active lock.

If no active lock exists, create a new lock record containing the tableId, userId, and an expiry timestamp (calculated as currentTime + duration).

If the table is already locked and the lock is active, return a 409 Conflict.

Responses:

200 OK:

{
  "success": true,
  "message": "Table locked successfully."
}

409 Conflict:

{
  "success": false,
  "message": "Table is currently locked by another user."
}

400 Bad Request: (e.g., missing required fields)

{
  "success": false,
  "message": "Invalid request body. 'tableId', 'userId', and 'duration' are required."
}

Example (cURL):

curl -X POST \
  http://localhost:3000/api/tables/lock \
  -H 'Content-Type: application/json' \
  -d '{
    "tableId": "table-A",
    "userId": "user-1",
    "duration": 300
  }'

2. POST /api/tables/unlock
Removes an existing lock from a table.

Description: Unlocks a table, but only if the requesting user is the one who established the lock.

Request Body:

{
  "tableId": "string", // Unique identifier for the table
  "userId": "string"   // Unique identifier for the user attempting to unlock
}

Logic:

Check if a lock exists for the tableId.

If a lock exists, verify that the userId in the request matches the userId that created the lock.

If both conditions are met (lock exists and user matches), remove the lock record.

If no lock is found, or if the user doesn't match, the lock is simply not removed.

Responses:

200 OK:

{
  "success": true,
  "message": "Table unlocked (or no active lock by this user)."
}

400 Bad Request: (e.g., missing required fields)

{
  "success": false,
  "message": "Invalid request body. 'tableId' and 'userId' are required."
}

Example (cURL):

curl -X POST \
  http://localhost:3000/api/tables/unlock \
  -H 'Content-Type: application/json' \
  -d '{
    "tableId": "table-A",
    "userId": "user-1"
  }'

3. GET /api/tables/:tableId/status
Checks the current lock status of a table.

Description: Retrieves whether a specific table is currently locked and if its lock has expired.

URL Parameters: tableId (string) - The unique identifier of the table.

Logic:

Determine if a lock exists for the specified tableId.

If a lock exists, ascertain if the lock has expired based on its expiry timestamp.

Responses:

200 OK:

{
  "isLocked": true/false // true if locked and not expired, false otherwise
}

Example (cURL):

curl -X GET http://localhost:3000/api/tables/table-A/status

⚙️ Getting Started
To set up and run the project locally:

Prerequisites
Node.js (LTS version recommended)

Installation
Clone the repository:

git clone [Your GitHub Repository Link Here]
cd [your-repo-name]

Install dependencies:

npm install

Running the Application
Start the server:

npm start

The API will start running on http://localhost:3000.

💾 Data Storage (In-Memory)
For simplicity and to meet the assignment requirements, lock records are stored in a simple JavaScript object (acting as a hash map or dictionary) within the application's memory. This means data will not persist if the server is restarted.

Each lock record contains:

tableId: The ID of the locked table.

userId: The ID of the user who placed the lock.

expiryTimestamp: A Unix timestamp (in milliseconds) indicating when the lock will expire.

The system periodically cleans up expired locks (though for an in-memory solution, a simple check on access is sufficient, a background cleanup could be added for larger scale).

✅ Deliverables & Assessment
This project aims to satisfy the following deliverables and assessment criteria:


Postman Collection: A Postman collection detailing and demonstrating the testing procedures for each endpoint.
link:- https://solar-escape-338173.postman.co/workspace/Team-Workspace~e1e40a3e-06ae-42e0-86d6-39317a866608/collection/38806499-7879b07d-b5a0-42f5-a0e2-303be7835c98?action=share&creator=38806499&active-environment=38806499-4ed36486-e61a-4666-8efb-6c606d61f328

