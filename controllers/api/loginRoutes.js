// controllers/authController.js
const express = require('express');
const router = express.Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');

// Render login page
router.get('/login', (req, res) => {
  res.render('login');
});

// Handle login POST
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send('Invalid username or password');
  }

  // Assuming session is set up
  req.session.userId = user.id;
  res.redirect('/dashboard');  // Redirect to user dashboard after login
});


module.exports = router;
