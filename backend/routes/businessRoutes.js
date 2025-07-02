const express = require('express');
const { body, validationResult } = require('express-validator');
const Business = require('../models/Business');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Get all businesses (public)
router.get('/', async (req, res) => {
  try {
    const { category, location, search } = req.query;
    let query = { status: 'approved', isActive: true };

    if (category) {
      query.businessType = category;
    }

    if (search) {
      query.$or = [
        { businessName: { $regex: search, $options: 'i' } },
        { address: { $regex: search, $options: 'i' } }
      ];
    }

    const businesses = await Business.find(query)
      .select('businessName businessType address settings')
      .limit(50);

    res.json(businesses);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Register new business
router.post('/register', [
  body('businessName').trim().isLength({ min: 2 }).escape(),
  body('businessType').isIn([
    'Salon & Spa', 'Medical Clinic', 'Dental Clinic', 'Restaurant',
    'Tattoo Parlour', 'Barber Shop', 'Beauty Parlour', 'Government Office',
    'Bank', 'Other'
  ]),
  body('ownerName').trim().isLength({ min: 2 }).escape(),
  body('email').isEmail().normalizeEmail(),
  body('phone').isMobilePhone(),
  body('address').trim().isLength({ min: 10 }).escape(),
  body('panCard').matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const existingBusiness = await Business.findOne({ 
      $or: [{ email: req.body.email }, { panCard: req.body.panCard }]
    });

    if (existingBusiness) {
      return res.status(400).json({ 
        message: 'Business already registered with this email or PAN' 
      });
    }

    const business = new Business(req.body);
    await business.save();

    res.status(201).json({ 
      message: 'Business registration submitted for review',
      businessId: business._id 
    });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed' });
  }
});

// Get business details
router.get('/:id', async (req, res) => {
  try {
    const business = await Business.findById(req.params.id)
      .select('-panCard -gstNumber -businessLicense');
    
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    res.json(business);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;