const express = require('express');
const { 
  sendMessage, 
  getMessages, 
  getConversations, 
  markAsRead 
} = require('../controllers/messageController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/send', authMiddleware, sendMessage);
router.get('/conversations', authMiddleware, getConversations);
router.get('/:otherUserId', authMiddleware, getMessages);
router.patch('/read', authMiddleware, markAsRead);

module.exports = router;