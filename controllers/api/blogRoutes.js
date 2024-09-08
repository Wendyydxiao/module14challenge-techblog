const router = require('express').Router();
const { Blog, Comment } = require('../../models');


router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [{ model: Comment }],
    });
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [{ model: Comment }],
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/', async (req, res) => {
  try {
    const newBlog = await Blog.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;

