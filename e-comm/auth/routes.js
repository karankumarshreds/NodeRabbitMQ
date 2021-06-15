const express = require('express');
const User = require('./User');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/auth/signup', async (req, res) => {
  const { email, password, name } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    return res.status(400).send({ message: 'User already exists' });
  } else {
    const newUser = new User({
      email,
      name,
      password,
    });
    await newUser.save();
    return res.send(newUser);
  }
});

router.post('/auth/signin', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (!user) {
    return res.status(400).send({ message: 'User does not exist' });
  } else {
    jwt.sign(
      {
        email,
        name: user.name,
      },
      'asdf',
      (err, token) => {
        if (err) {
          console.log(err);
          return res.status(500).send({ message: 'Internal server error' });
        } else {
          return res.json({ token });
        }
      }
    );
  }
});

module.exports = UserRoutes = router;
