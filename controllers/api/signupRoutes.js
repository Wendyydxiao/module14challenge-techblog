// controllers/authController.js
const express = require('express');
const router = express.Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');

// Render signup page
router.get('/signup', (req, res) => {
  res.render('signup');
});

// Handle signup POST
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await User.create({
      username,
      password: hashedPassword,
    });

    // Assuming session is set up
    req.session.userId = newUser.id;
    res.redirect('/dashboard');  // Redirect to dashboard after signup
  } catch (error) {
    res.status(400).send('Error creating user');
  }
});


module.exports = router;
