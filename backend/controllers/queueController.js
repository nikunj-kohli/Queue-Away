const Queue = require('../models/Queue');
const Business = require('../models/Business');
const { getFirestore } = require('../config/firebase');

// Get user's queues
exports.getUserQueues = async (req, res) => {
  try {
    const queues = await Queue.find({ 
      userId: req.userId,
      status: { $in: ['waiting', 'called'] }
    })
    .populate('businessId', 'businessName address businessType')
    .sort({ createdAt: -1 });

    res.json(queues);
  } catch (error) {
    console.error('Get user queues error:', error);
    res.status(500).json({ message: 'Failed to fetch queues' });
  }
};

// Join a queue
exports.joinQueue = async (req, res) => {
  try {
    const { businessId, serviceType, notes } = req.body;

    // Check if business exists
    const business = await Business.findById(businessId);
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    // Check if user already in queue for this business
    const existingQueue = await Queue.findOne({
      userId: req.userId,
      businessId,
      status: { $in: ['waiting', 'called'] }
    });

    if (existingQueue) {
      return res.status(400).json({ message: 'Already in queue for this business' });
    }

    // Get current queue position
    const currentQueueCount = await Queue.countDocuments({
      businessId,
      status: 'waiting'
    });

    const position = currentQueueCount + 1;
    const estimatedWaitTime = position * 15; // 15 minutes per person

    const queue = new Queue({
      businessId,
      userId: req.userId,
      position,
      estimatedWaitTime,
      serviceType: serviceType || 'general',
      notes
    });

    await queue.save();
    await queue.populate('businessId', 'businessName address businessType');

    // Send real-time notification via Firebase
    const db = getFirestore();
    if (db) {
      await db.collection('queue_updates').add({
        type: 'user_joined',
        businessId,
        userId: req.userId,
        position,
        timestamp: new Date()
      });
    }

    res.status(201).json(queue);
  } catch (error) {
    console.error('Join queue error:', error);
    res.status(500).json({ message: 'Failed to join queue' });
  }
};

// Leave queue
exports.leaveQueue = async (req, res) => {
  try {
    const { queueId } = req.params;

    const queue = await Queue.findOne({
      _id: queueId,
      userId: req.userId,
      status: { $in: ['waiting', 'called'] }
    });

    if (!queue) {
      return res.status(404).json({ message: 'Queue not found' });
    }

    queue.status = 'cancelled';
    await queue.save();

    // Update positions for remaining users
    await Queue.updateMany(
      {
        businessId: queue.businessId,
        status: 'waiting',
        position: { $gt: queue.position }
      },
      { $inc: { position: -1 } }
    );

    res.json({ message: 'Left queue successfully' });
  } catch (error) {
    console.error('Leave queue error:', error);
    res.status(500).json({ message: 'Failed to leave queue' });
  }
};

// Get business queue status
exports.getBusinessQueue = async (req, res) => {
  try {
    const { businessId } = req.params;

    const queueCount = await Queue.countDocuments({
      businessId,
      status: 'waiting'
    });

    const averageWaitTime = queueCount * 15; // 15 minutes per person

    res.json({
      currentQueueLength: queueCount,
      estimatedWaitTime: averageWaitTime,
      status: queueCount > 10 ? 'busy' : queueCount > 5 ? 'moderate' : 'available'
    });
  } catch (error) {
    console.error('Get business queue error:', error);
    res.status(500).json({ message: 'Failed to fetch queue status' });
  }
};