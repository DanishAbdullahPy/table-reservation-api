 
const express = require('express');
const router = express.Router();
const { lockTable, unlockTable, getTableStatus } = require('../controllers/tableController');
const { validateLockRequest, validateUnlockRequest, validateTableId } = require('../middleware/validation');

// Lock a table
router.post('/lock', validateLockRequest, lockTable);

// Unlock a table
router.post('/unlock', validateUnlockRequest, unlockTable);

// Get table status
router.get('/:tableId/status', validateTableId, getTableStatus);

module.exports = router;
