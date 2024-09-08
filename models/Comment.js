const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
  {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    blog_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Blogs',
        key: 'id',
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    }, 
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'Comments',
  }
);

module.exports = Comment;

