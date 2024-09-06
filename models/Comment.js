const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init({
  content: DataTypes.TEXT,
}, { sequelize });

module.exports = Comment;

