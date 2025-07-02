const mongoose = require('mongoose');

const queueSchema = new mongoose.Schema({
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  position: {
    type: Number,
    required: true
  },
  estimatedWaitTime: {
    type: Number, // in minutes
    default: 0
  },
  status: {
    type: String,
    enum: ['waiting', 'called', 'served', 'cancelled'],
    default: 'waiting'
  },
  queueDate: {
    type: Date,
    default: Date.now
  },
  serviceType: {
    type: String,
    default: 'general'
  },
  notes: {
    type: String,
    maxlength: 200
  }
}, {
  timestamps: true
});

// Index for efficient queries
queueSchema.index({ businessId: 1, status: 1, createdAt: 1 });
queueSchema.index({ userId: 1, status: 1 });

module.exports = mongoose.model('Queue', queueSchema);