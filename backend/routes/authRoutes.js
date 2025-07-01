const express = require('express');
const router = express.Router();
const passport = require('passport');
const { googleCallback, logout, getCurrentUser } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Google OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/?error=auth_failed' }), googleCallback);
router.post('/logout', authMiddleware, logout);
router.get('/me', authMiddleware, getCurrentUser);

module.exports = router;