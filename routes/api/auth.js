const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secret = process.env.jwtsecret;
const passport = require('passport');
const User = require('../../models/Usermodel');

// @route       GET api/auth
// @desc        Test route
// @access      Public

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route       POST api/auth
// @desc        Authenticate User get token
// @access      Public
router.post(
  '/',
  [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Password is requierd').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    console.log(req.body);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, secret, { expiresIn: 36000000 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@desc Auth with Google
//@route GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

//@desc Google Auth Callback
//@route GET /auth/google/callback

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/dashboard');
  }
);

module.exports = router;
