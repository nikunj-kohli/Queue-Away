
const { DataTypes } = require('sequelize');
const sequelize = require('../config/mysql');

const Payment = sequelize.define('Payment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  mongoUserId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'users',
      key: '_id'
    }
  },
  razorpayOrderId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  razorpayPaymentId: {
    type: DataTypes.STRING,
    allowNull: true
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  currency: {
    type: DataTypes.STRING,
    defaultValue: 'INR'
  },
  status: {
    type: DataTypes.ENUM('created', 'paid', 'failed'),
    defaultValue: 'created'
  },
  transactionId: {
    type: DataTypes.STRING,
    allowNull: true
  },
  signature: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  timestamps: true,
  tableName: 'payments'
});

module.exports = Payment;
