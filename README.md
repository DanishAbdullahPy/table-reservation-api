# Table Reservation Lock API

A robust RESTful API designed to manage temporary table availability by "locking" tables during the booking process, preventing simultaneous double-bookings and ensuring smooth reservation workflows.

## 🎯 The Scenario

To manage table availability effectively, a system is required to temporarily "lock" a table while a user completes their booking. This mechanism is crucial for preventing simultaneous double-bookings of the same table. This API provides the core logic for this functionality.

## ✨ Features

- **🔒 Temporary Table Locking**: Allows users to temporarily reserve tables for specified durations
- **⚔️ Conflict Prevention**: Prevents multiple users from locking the same table simultaneously
- **🔐 Controlled Unlocking**: Ensures only the original user can unlock their reserved table
- **📊 Real-time Status Check**: Provides instant table availability status with expiry tracking
- **🧹 Automatic Cleanup**: Background process removes expired locks every 60 seconds
- **✅ Input Validation**: Comprehensive validation with detailed error messages
- **🛡️ Security Headers**: Helmet.js implementation for enhanced security
- **📝 Request Logging**: Morgan middleware for comprehensive request monitoring

## 🛠️ Tech Stack

- **Node.js**: JavaScript runtime environment
- **Express.js**: Fast, unopinionated, minimalist web framework
- **In-memory Data Store**: JavaScript Map object for efficient O(1) operations
- **Middleware Stack**: CORS, Helmet, Morgan for security and logging

## 📁 Project Structure

```
table-reservation-api/
├── src/
│   ├── controllers/
│   │   └── tableController.js    # Business logic handlers
│   ├── middleware/
│   │   └── validation.js         # Input validation middleware
│   ├── models/
│   │   └── lockManager.js        # In-memory lock management
│   ├── routes/
│   │   └── tableRoutes.js        # API route definitions
│   └── app.js                    # Express app configuration
├── tests/
│   └── postman_collection.json   # Postman test collection
├── server.js                     # Server entry point
├── package.json                  # Dependencies and scripts
└── README.md                     # Project documentation
```

## 🚀 API Endpoints

### 1. 🔒 POST /api/tables/lock

Locks a specified table for a given duration.

#### Request Body:
```json
{
  "tableId": "table-123",
  "userId": "user-abc",
  "duration": 600
}
```

#### Parameters:
- `tableId` (string, required): Unique identifier for the table
- `userId` (string, required): Unique identifier for the user
- `duration` (number, required): Lock duration in seconds (max: 3600)

#### Responses:

✅ **200 OK** - Success:
```json
{
  "success": true,
  "message": "Table locked successfully."
}
```

❌ **409 Conflict** - Table already locked:
```json
{
  "success": false,
  "message": "Table is currently locked by another user."
}
```

❌ **400 Bad Request** - Invalid input:
```json
{
  "success": false,
  "message": "duration is required and must be a positive number"
}
```

#### Example (cURL):
```bash
curl -X POST \
  http://localhost:3000/api/tables/lock \
  -H 'Content-Type: application/json' \
  -d '{
    "tableId": "table-A",
    "userId": "user-1",
    "duration": 300
  }'
```

### 2. 🔓 POST /api/tables/unlock

Removes an existing lock from a table.

#### Request Body:
```json
{
  "tableId": "table-123",
  "userId": "user-abc"
}
```

#### Parameters:
- `tableId` (string, required): Unique identifier for the table
- `userId` (string, required): Unique identifier for the user attempting to unlock

#### Responses:

✅ **200 OK** - Success:
```json
{
  "success": true,
  "message": "Table unlocked successfully."
}
```

❌ **400 Bad Request** - Invalid input:
```json
{
  "success": false,
  "message": "tableId and userId are required"
}
```

#### Example (cURL):
```bash
curl -X POST \
  http://localhost:3000/api/tables/unlock \
  -H 'Content-Type: application/json' \
  -d '{
    "tableId": "table-A",
    "userId": "user-1"
  }'
```

### 3. 📊 GET /api/tables/:tableId/status

Checks the current lock status of a table.

#### URL Parameters:
- `tableId` (string, required): The unique identifier of the table

#### Response:

✅ **200 OK**:
```json
{
  "isLocked": true
}
```

#### Example (cURL):
```bash
curl -X GET http://localhost:3000/api/tables/table-A/status
```

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js (LTS version recommended)
- npm or yarn package manager

### Installation

#### 1. Clone the repository:
```bash
git clone [Your GitHub Repository Link Here]
cd table-reservation-api
```

#### 2. Install dependencies:
```bash
npm install
```

### Running the Application

#### Development Mode:
```bash
npm run dev
```

#### Production Mode:
```bash
npm start
```

The API will start running on `http://localhost:3000`.

### Health Check
Verify the server is running:
```bash
curl http://localhost:3000/health
```

## 💾 Data Storage (In-Memory)

For simplicity and assignment requirements, lock records are stored in a JavaScript Map object within the application's memory. This approach provides:

- **Fast Access**: O(1) lookup operations
- **Automatic Cleanup**: Background process removes expired locks
- **Zero Dependencies**: No external database required

#### Lock Record Structure:
```javascript
{
  tableId: "table-123",
  userId: "user-abc",
  expiryTime: 1674567890000,  // Unix timestamp
  createdAt: 1674567290000    // Creation timestamp
}
```

**Note**: Data will not persist if the server is restarted.

## 🧪 Testing

### Postman Collection
A comprehensive Postman collection is provided with:
- ✅ All endpoint tests
- ✅ Success scenarios
- ✅ Error handling tests
- ✅ Edge case validation
- ✅ Automated test sequences

**Postman Collection Link**: [https://solar-escape-338173.postman.co/workspace/Team-Workspace~e1e40a3e-06ae-42e0-86d6-39317a866608/collection/38806499-7879b07d-b5a0-42f5-a0e2-303be7835c98?action=share&creator=38806499&active-environment=38806499-4ed36486-e61a-4666-8efb-6c606d61f328](https://solar-escape-338173.postman.co/workspace/Team-Workspace~e1e40a3e-06ae-42e0-86d6-39317a866608/collection/38806499-7879b07d-b5a0-42f5-a0e2-303be7835c98?action=share&creator=38806499&active-environment=38806499-4ed36486-e61a-4666-8efb-6c606d61f328)

### Test Coverage
- **Functional Tests**: All core business logic
- **Validation Tests**: Input parameter validation
- **Security Tests**: Authorization and access control
- **Performance Tests**: Response time verification
- **Edge Cases**: Expired locks, concurrent requests

## 🔧 Configuration

### Environment Variables
```bash
PORT=3000                    # Server port (default: 3000)
NODE_ENV=development         # Environment mode
```

### Scripts
```json
{
  "start": "node server.js",         # Production start
  "dev": "nodemon server.js",        # Development with hot reload
  "test": "echo \"Tests available in Postman collection\""
}
```

## 🏗️ Architecture & Design Patterns

### Architectural Principles
- **MVC Pattern**: Clear separation of concerns
- **Middleware Pattern**: Reusable validation and error handling
- **Singleton Pattern**: Single instance lock manager
- **RESTful Design**: Standard HTTP methods and status codes

### Security Features
- **Input Validation**: Comprehensive parameter validation
- **CORS Protection**: Cross-origin request handling
- **Security Headers**: Helmet.js implementation
- **Authorization**: User ownership verification

## 📈 Production Considerations

### Current Limitations
- **In-Memory Storage**: Data lost on server restart
- **Single Instance**: No distributed locking mechanism
- **No Persistence**: Suitable for development/testing only

### Production Upgrades
For production deployment, consider:
- **Redis**: For distributed, persistent locking
- **Database Integration**: PostgreSQL/MongoDB for data persistence
- **Load Balancing**: Multiple server instances
- **Monitoring**: APM tools integration
- **Authentication**: JWT-based user authentication
- **Rate Limiting**: Request throttling implementation

## 📋 Deliverables

- ✅ **GitHub Repository**: Complete source code with professional structure
- ✅ **Postman Collection**: Comprehensive testing suite with all scenarios
- ✅ **Documentation**: Detailed API documentation and setup guide
- ✅ **Production Ready**: Error handling, validation, and security features

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎉 Acknowledgments

- Built as part of a backend developer assessment
- Demonstrates RESTful API design principles
- Showcases Node.js/Express.js best practices
- Implements production-ready error handling and validation

**🚀 Ready to prevent double-bookings and manage table reservations efficiently!**
