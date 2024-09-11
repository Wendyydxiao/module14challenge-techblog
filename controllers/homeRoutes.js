const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/',async (req, res) => {
  try {

    const blogs = await Blog.findAll({
      include: [User]
    });
    // const users = await User.findAll();
    // const comments = await Comment.findAll();

    const blogsData = blogs.map((blog) => blog.get({ plain: true }));
  
    res.render('homepage', {
      blogsData,
      loggedIn: req.session.logged_in
    });
  } 
  catch (err) {
    res.status(500).json({ message: 'Failed to load home data', error: err });
  }
});

router.get('/login', async (req, res) => {
  try {
    res.render('login');
  } 
  catch (err) {
    res.status(500).json({ message: 'Failed to load login page', error: err });
  }
});


router.get('/blog',withAuth, async (req, res) => {
  try {
    const users = await User.findByPk(req.session.user_id,{
      include: [Blog]
    });
    const usersData = users.get({ plain: true });
    
    res.render('blog', {
      usersData,
      loggedIn: req.session.logged_in
    })
  } 
  catch (err) {
    res.status(500).json({ message: 'Failed to load blog page', error: err });
  }
});

router.get('/blog/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {model:Comment, 
          include:{
            model:User,
            attributes:['username'],
          }
        },
        User,
      ],
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.render('comment',{
      blogData: blogData.get({ plain: true }),
      loggedIn: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
