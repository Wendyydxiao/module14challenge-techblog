const router = require('express').Router();
const { Blog, User, Comment } = require('../models');

router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render('homepage', {
      blogs,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/blog/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    const blog = blogData.get({ plain: true });

    res.render('blog', {
      blog,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/profile', async (req, res) => {
    try {
      const blogData = await Blog.findAll({
        where: {
          user_id: req.session.user_id,
        },
      });
  
      const blogs = blogData.map((blog) => blog.get({ plain: true }));
  
      res.render('profile', {
        blogs,
        loggedIn: true,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      return res.redirect('/');
    }
    res.render('login');
  });

  router.get('/', (req, res) => {
    if (req.session.loggedIn) {
      return res.redirect('/');
    }
    res.render('signup'); 
  });

module.exports = router;
