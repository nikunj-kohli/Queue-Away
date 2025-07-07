const express = require('express');
const { getMyQueues, addToQueue, updateQueue, deleteQueue } = require('../controllers/queueController');
const router = express.Router();

router.get('/', getMyQueues);
router.get('/test', (req, res) => res.json({ message: 'Queue API working' }));
router.post('/', addToQueue);
router.put('/:id', updateQueue);      // Update a queue entry by ID
router.delete('/:id', deleteQueue);   // Delete a queue entry by ID

module.exports = router;