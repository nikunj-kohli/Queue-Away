const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  waitTime: String // Optional, remove if not needed
});

module.exports = mongoose.model('Shop', shopSchema);