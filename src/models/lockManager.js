 
class LockManager {
  constructor() {
    this.locks = new Map(); // Using Map for better performance
    this.cleanupInterval = setInterval(() => this.cleanupExpiredLocks(), 60000); // Cleanup every minute
  }

  createLock(tableId, userId, duration) {
    // Check if table is already locked and not expired
    if (this.isTableLocked(tableId)) {
      return { success: false, message: "Table is currently locked by another user." };
    }

    const expiryTime = Date.now() + (duration * 1000);
    const lockRecord = {
      tableId,
      userId,
      expiryTime,
      createdAt: Date.now()
    };

    this.locks.set(tableId, lockRecord);
    
    return { 
      success: true, 
      message: "Table locked successfully.",
      lockRecord 
    };
  }

  removeLock(tableId, userId) {
    const existingLock = this.locks.get(tableId);
    
    if (!existingLock) {
      return { success: true, message: "No lock found for this table." };
    }

    // Verify ownership
    if (existingLock.userId !== userId) {
      return { success: false, message: "Unauthorized: You cannot unlock a table locked by another user." };
    }

    this.locks.delete(tableId);
    return { success: true, message: "Table unlocked successfully." };
  }

  isTableLocked(tableId) {
    const lock = this.locks.get(tableId);
    
    if (!lock) return false;
    
    // Check if lock has expired
    if (Date.now() > lock.expiryTime) {
      this.locks.delete(tableId);
      return false;
    }
    
    return true;
  }

  getLockStatus(tableId) {
    return {
      isLocked: this.isTableLocked(tableId),
      lockDetails: this.locks.get(tableId) || null
    };
  }

  cleanupExpiredLocks() {
    const currentTime = Date.now();
    for (const [tableId, lock] of this.locks.entries()) {
      if (currentTime > lock.expiryTime) {
        this.locks.delete(tableId);
      }
    }
  }

  // Utility method for testing
  getAllLocks() {
    return Array.from(this.locks.entries());
  }
}

module.exports = new LockManager();
