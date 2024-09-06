const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Blog extends Model {}

Blog.init({
  title: DataTypes.STRING,
  content: DataTypes.TEXT,
}, { sequelize });

module.exports = Blog;

