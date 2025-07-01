
const { DataTypes } = require('sequelize');
const sequelize = require('../config/mysql');

const Feedback = sequelize.define('Feedback', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  mongoUserId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  category: {
    type: DataTypes.ENUM('service', 'app', 'general'),
    defaultValue: 'general'
  }
}, {
  timestamps: true,
  tableName: 'feedback'
});

module.exports = Feedback;
