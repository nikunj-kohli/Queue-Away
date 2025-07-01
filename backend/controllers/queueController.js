const Queue = require('../models/Queue');
const Shop = require('../models/Shop');

exports.getMyQueues = async (req, res) => {
  const userId = "demoUser";
  const queues = await Queue.find({ userId });
  res.json(queues);
};

exports.getQueueById = async (req, res) => {
  const queue = await Queue.findById(req.params.id);
  if (!queue) return res.status(404).json({ message: "Queue not found" });
  res.json(queue);
};

exports.addToQueue = async (req, res) => {
  const userId = "demoUser";
  const { shopId, date, time } = req.body;
  const shop = await Shop.findById(shopId);
  if (!shop) return res.status(404).json({ message: "Shop not found" });

  const count = await Queue.countDocuments({ shopId, date, time });
  const position = count + 1;
  const waitTime = `${position * 10} mins`;

  const queue = new Queue({
    userId,
    shopId,
    shopName: shop.name,
    shopAddress: shop.address,
    date,
    time,
    position,
    waitTime
  });
  await queue.save();
  res.status(201).json(queue);
};

exports.updateQueue = async (req, res) => {
  const { date, time, position } = req.body;
  const queue = await Queue.findByIdAndUpdate(
    req.params.id,
    { date, time, position },
    { new: true }
  );
  if (!queue) return res.status(404).json({ message: "Queue not found" });
  res.json(queue);
};

exports.deleteQueue = async (req, res) => {
  const queue = await Queue.findByIdAndDelete(req.params.id);
  if (!queue) return res.status(404).json({ message: "Queue not found" });
  res.json({ message: "Queue deleted" });
};