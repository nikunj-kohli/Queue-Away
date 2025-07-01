const Shop = require('../models/Shop');

exports.getAllShops = async (req, res) => {
  const shops = await Shop.find();
  res.json(shops);
};

exports.createShop = async (req, res) => {
  try {
    const { name, address } = req.body;
    const shop = new Shop({ name, address });
    await shop.save();
    res.status(201).json(shop);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateShop = async (req, res) => {
  try {
    const { name, address } = req.body;
    const shop = await Shop.findByIdAndUpdate(
      req.params.id,
      { name, address },
      { new: true }
    );
    if (!shop) return res.status(404).json({ message: 'Shop not found' });
    res.json(shop);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getShopById = async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);
    if (!shop) return res.status(404).json({ message: 'Shop not found' });
    res.json(shop);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteShop = async (req, res) => {
  const shop = await Shop.findByIdAndDelete(req.params.id);
  if (!shop) return res.status(404).json({ message: "Shop not found" });
  res.json({ message: "Shop deleted" });
};