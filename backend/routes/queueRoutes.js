const express = require('express');
const { body, validationResult } = require('express-validator');
const {
  getUserQueues,
  joinQueue,
  leaveQueue,
  getBusinessQueue
} = require('../controllers/queueController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Get user's current queues
router.get('/my-queues', authMiddleware, getUserQueues);

// Join a queue
router.post('/join', authMiddleware, [
  body('businessId').isMongoId(),
  body('serviceType').optional().trim().isLength({ max: 50 }),
  body('notes').optional().trim().isLength({ max: 200 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  joinQueue(req, res);
});

// Leave a queue
router.delete('/:queueId', authMiddleware, leaveQueue);

// Get business queue status (public)
router.get('/business/:businessId/status', getBusinessQueue);

module.exports = router;