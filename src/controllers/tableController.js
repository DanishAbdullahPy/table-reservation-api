 
const lockManager = require('../models/lockManager');

const lockTable = async (req, res) => {
  try {
    const { tableId, userId, duration } = req.body;
    
    const result = lockManager.createLock(tableId, userId, duration);
    
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: result.message
      });
    } else {
      return res.status(409).json({
        success: false,
        message: result.message
      });
    }
  } catch (error) {
    console.error('Error in lockTable:', error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

const unlockTable = async (req, res) => {
  try {
    const { tableId, userId } = req.body;
    
    const result = lockManager.removeLock(tableId, userId);
    
    return res.status(200).json({
      success: result.success,
      message: result.message
    });
  } catch (error) {
    console.error('Error in unlockTable:', error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

const getTableStatus = async (req, res) => {
  try {
    const { tableId } = req.params;
    
    const status = lockManager.getLockStatus(tableId);
    
    return res.status(200).json({
      isLocked: status.isLocked
    });
  } catch (error) {
    console.error('Error in getTableStatus:', error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

module.exports = {
  lockTable,
  unlockTable,
  getTableStatus
};
