const router = require('express').Router();
const { Comment } = require('../../models');


router.post('/', async (req, res) => {
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


router.get('/:blog_id', async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: {
        blog_id: req.params.blog_id,
      },
    });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
