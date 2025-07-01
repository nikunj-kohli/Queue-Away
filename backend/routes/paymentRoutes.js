const express = require('express');
const router = express.Router();
const { createOrder, verifyPayment, getPaymentHistory } = require('../controllers/paymentController');
const authMiddleware = require('../middleware/authMiddleware');

// Create Razorpay order
router.post('/order', authMiddleware, createOrder);

// Verify Razorpay payment
router.post('/verify', authMiddleware, verifyPayment);

// Get payment history
router.get('/history', authMiddleware, getPaymentHistory);

module.exports = router;