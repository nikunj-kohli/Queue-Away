
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Payment = require('../models/Payment');
const Log = require('../models/Log');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'your_key_id',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'your_key_secret'
});

exports.createOrder = async (req, res) => {
  try {
    const { amount, currency = 'INR' } = req.body;
    
    if (!amount || amount < 1) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    const options = {
      amount: amount * 100, // Convert to paise
      currency,
      receipt: `receipt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);
    
    // Store payment record
    const payment = await Payment.create({
      mongoUserId: req.userId,
      razorpayOrderId: order.id,
      amount,
      currency,
      status: 'created'
    });

    // Log the payment creation
    await Log.create({
      mongoUserId: req.userId,
      action: 'payment_order_created',
      details: `Payment order created for amount: ${amount}`,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Failed to create order' });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature 
    } = req.body;

    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'your_key_secret')
      .update(sign.toString())
      .digest('hex');

    if (razorpay_signature === expectedSign) {
      // Payment successful
      const payment = await Payment.findOne({ 
        razorpayOrderId: razorpay_order_id 
      });
      
      if (payment) {
        payment.razorpayPaymentId = razorpay_payment_id;
        payment.signature = razorpay_signature;
        payment.status = 'paid';
        payment.transactionId = razorpay_payment_id;
        await payment.save();

        // Log successful payment
        await Log.create({
          mongoUserId: req.userId,
          action: 'payment_successful',
          details: `Payment verified for order: ${razorpay_order_id}`,
          ipAddress: req.ip,
          userAgent: req.get('User-Agent')
        });

        res.json({ 
          success: true, 
          message: 'Payment verified successfully',
          paymentId: razorpay_payment_id
        });
      } else {
        res.status(404).json({ message: 'Payment record not found' });
      }
    } else {
      // Payment failed
      const payment = await Payment.findOne({ 
        razorpayOrderId: razorpay_order_id 
      });
      
      if (payment) {
        payment.status = 'failed';
        await payment.save();
      }

      // Log failed payment
      await Log.create({
        mongoUserId: req.userId,
        action: 'payment_failed',
        details: `Payment verification failed for order: ${razorpay_order_id}`,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      });

      res.status(400).json({ 
        success: false, 
        message: 'Payment verification failed' 
      });
    }
  } catch (error) {
    console.error('Verify payment error:', error);
    res.status(500).json({ message: 'Payment verification error' });
  }
};

exports.getPaymentHistory = async (req, res) => {
  try {
    const payments = await Payment.findAll({
      where: { mongoUserId: req.userId },
      order: [['createdAt', 'DESC']],
      limit: 50
    });

    res.json(payments);
  } catch (error) {
    console.error('Get payment history error:', error);
    res.status(500).json({ message: 'Failed to fetch payment history' });
  }
};
