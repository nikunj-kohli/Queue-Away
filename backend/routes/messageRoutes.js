
const express = require('express');
const { 
  sendMessage, 
  getMessages, 
  getConversations, 
  markAsRead 
} = require('../controllers/messageController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/send', protect, sendMessage);
router.get('/conversations', protect, getConversations);
router.get('/:otherUserId', protect, getMessages);
router.patch('/read', protect, markAsRead);

module.exports = router;
