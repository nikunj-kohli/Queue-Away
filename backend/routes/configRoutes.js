const express = require('express');
const router = express.Router();

router.get('/config', (req, res) => {
  res.json({
    firebase: {
      apiKey: process.env.VITE_FIREBASE_API_KEY,
      authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
      // Add other required Firebase keys
    },
    razorpayKey: process.env.RAZORPAY_KEY_ID, // From backend .env
  });
});

module.exports = router;