
const User = require('../models/User');
const Log = require('../models/Log');
const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'your-secret-key', {
    expiresIn: '7d'
  });
};

exports.googleCallback = async (req, res) => {
  try {
    const { googleId, name, email, profilePicture } = req.user;
    
    let user = await User.findOne({ googleId });
    
    if (!user) {
      user = await User.findOne({ email });
      if (user) {
        user.googleId = googleId;
        user.profilePicture = profilePicture;
        await user.save();
      } else {
        user = new User({
          name,
          email,
          googleId,
          profilePicture,
          isVerified: true
        });
        await user.save();
      }
    }

    user.lastLogin = new Date();
    await user.save();

    // Log the login
    await Log.create({
      mongoUserId: user._id,
      action: 'google_login',
      details: 'User logged in via Google OAuth',
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    const token = generateToken(user._id);
    
    res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}?token=${token}`);
  } catch (error) {
    console.error('Google auth callback error:', error);
    res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}?error=auth_failed`);
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-googleId');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.logout = async (req, res) => {
  try {
    await Log.create({
      mongoUserId: req.userId,
      action: 'logout',
      details: 'User logged out',
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });
    
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
