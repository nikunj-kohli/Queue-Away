const express = require('express');
const router = express.Router();
const passport = require('passport');
const { googleAuth, googleCallback, logout } = require('../controllers/authController');

// Google OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), googleCallback);
router.post('/logout', logout);