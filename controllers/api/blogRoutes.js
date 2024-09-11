const router = require('express').Router();
const { Blog, Comment } = require('../../models');
const withAuth = require('../../utils/auth');


// router.get('/blog', async (req, res) => {
//   try {
//     const blogData = await Blog.findAll({
//       include: [{ model: Comment }],
//     });
//     res.status(200).json(blogData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });




router.post('/', withAuth, async (req, res) => {
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

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.destroy({where: {id: req.params.id}});

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/comments', async (req, res) => {
  try {
    const newComment = await Comment.create({
      content: req.body.content,
      user_id: req.session.user_id,
      blog_id: req.body.blog_id,
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;

