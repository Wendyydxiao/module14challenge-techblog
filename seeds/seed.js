const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // Seed users
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // Convert array of users to an object for easier lookup by username
  const userMap = {};
  users.forEach(user => {
    userMap[user.username] = user.id;
  });

  // Seed blogs with associated user and comments
  for (const blog of blogData) {
    // Find the user ID by username
    const userId = userMap[blog.username];

    // Create the blog post
    const newBlog = await Blog.create({
      title: blog.title,
      content: blog.content,
      user_id: userId,
    });

    // If there are comments for this blog, insert them
    if (blog.comments) {
      for (const comment of blog.comments) {
        const commentUserId = userMap[comment.username]; // Find the user ID by comment username
        await Comment.create({
          content: comment.content,
          user_id: commentUserId,
          blog_id: newBlog.id,
        });
      }
    }
  }

  process.exit(0);
};

seedDatabase();
