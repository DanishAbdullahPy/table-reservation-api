 
const validateLockRequest = (req, res, next) => {
  const { tableId, userId, duration } = req.body;

  if (!tableId || typeof tableId !== 'string') {
    return res.status(400).json({
      success: false,
      message: "tableId is required and must be a string"
    });
  }

  if (!userId || typeof userId !== 'string') {
    return res.status(400).json({
      success: false,
      message: "userId is required and must be a string"
    });
  }

  if (!duration || typeof duration !== 'number' || duration <= 0) {
    return res.status(400).json({
      success: false,
      message: "duration is required and must be a positive number"
    });
  }

  // Reasonable duration limits (max 1 hour)
  if (duration > 3600) {
    return res.status(400).json({
      success: false,
      message: "duration cannot exceed 3600 seconds (1 hour)"
    });
  }

  next();
};

const validateUnlockRequest = (req, res, next) => {
  const { tableId, userId } = req.body;

  if (!tableId || typeof tableId !== 'string') {
    return res.status(400).json({
      success: false,
      message: "tableId is required and must be a string"
    });
  }

  if (!userId || typeof userId !== 'string') {
    return res.status(400).json({
      success: false,
      message: "userId is required and must be a string"
    });
  }

  next();
};

const validateTableId = (req, res, next) => {
  const { tableId } = req.params;

  if (!tableId || typeof tableId !== 'string') {
    return res.status(400).json({
      success: false,
      message: "tableId parameter is required and must be a string"
    });
  }

  next();
};

module.exports = {
  validateLockRequest,
  validateUnlockRequest,
  validateTableId
};
