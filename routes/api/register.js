const express = require('express');
const router = express.Router();
const User = require('../../models/Usermodel');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findOneAndUpdate } = require('../../models/Usermodel');
const secret = process.env.jwtsecret;

// @route       POST api/register/
// @desc        Register
// @access      Public

router.post(
  '/',
  [
    check('email', 'You must use a valid email').isEmail(),
    check('name', 'Name is requierd').not().isEmpty(),
    check('password', 'your password must be at least 6 characters').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { name, email, password } = req.body;

      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }
      user = new User({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, secret, { expiresIn: 36000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route       POST api/register/edit
// @desc        edit user's info
// @access      Private

router.post(
  '/edit',
  [
    auth,
    [
      check('email', 'You must use a valid email').isEmail(),
      check('name', 'Name is requierd').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    const { email, name } = req.body;
    const newUser = {
      email,
      name,
    };
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.user.id },
        { $set: newUser },
        { new: true }
      );
      if (user) {
        await user.save();
        res.json(user);
      } else {
        res.status(400).json({ errors: [{ msg: 'User not found' }] });
      }
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route       POST api/register/edit/author
// @desc        edit author attribute
// @access      Private

router.post('/edit/author', auth, async (req, res) => {
  try {
    let user = await User.findById(req.user.id);

    if (user.isAuthor) {
      user = await User.findById(req.body.id);
      user.isAuthor = true;
      await user.save();
    }
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
