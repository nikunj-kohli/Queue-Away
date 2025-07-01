
const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  businessName: {
    type: String,
    required: true,
    trim: true
  },
  businessType: {
    type: String,
    required: true,
    enum: [
      'Salon & Spa',
      'Medical Clinic', 
      'Dental Clinic',
      'Restaurant',
      'Tattoo Parlour',
      'Barber Shop',
      'Beauty Parlour',
      'Government Office',
      'Bank',
      'Other'
    ]
  },
  ownerName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  panCard: {
    type: String,
    required: true,
    uppercase: true
  },
  gstNumber: {
    type: String,
    uppercase: true,
    default: null
  },
  businessLicense: {
    type: String,
    default: null
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  verificationDocuments: [{
    type: String, // URLs to uploaded documents
  }],
  subscriptionPlan: {
    type: String,
    enum: ['basic', 'premium', 'enterprise'],
    default: 'basic'
  },
  isActive: {
    type: Boolean,
    default: false
  },
  settings: {
    allowOnlineBooking: {
      type: Boolean,
      default: true
    },
    requirePayment: {
      type: Boolean,
      default: false
    },
    maxAdvanceBooking: {
      type: Number,
      default: 7 // days
    }
  }
}, {
  timestamps: true
});

// Index for faster queries
businessSchema.index({ email: 1 });
businessSchema.index({ status: 1 });
businessSchema.index({ businessType: 1 });

module.exports = mongoose.models.Business || mongoose.model('Business', businessSchema);
