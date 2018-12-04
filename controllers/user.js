const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/dev_keys');

// Load Input Validation
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

// Load User model
const User = require('../models/User');

// @route POST api/users/register
// @desc Register user
// @access Public
exports.postRegister = async (req, res) => {
  const {errors, isValid} = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const user = await User.findOne({email: req.body.emailReg});
    if (user) {
      errors.emailReg = 'Email already exists';
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.emailReg, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });
      const newUserData = new User({
        name: req.body.name,
        email: req.body.emailReg,
        avatar,
        password: req.body.passwordReg,
      });

      // Bcrypt the password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUserData.password, salt, async (err, hash) => {
          if (err) throw err;
          newUserData.password = hash;
          const newUser = await newUserData.save();
          res.json(newUser);
          req.body.isSubmit = true;
        });
      });
    }
  } catch (err) {
    console.log(err);
  }
};

// @route POST api/users/login
// @desc Login user / Returning JWT token
// @access Public
exports.postLogin = async (req, res) => {
  const {errors, isValid} = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({email});

    // Check for user
    if (!user) {
      errors.email = 'User not found';
      return res.status(404).json(errors);
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      // User matched
      const payload = {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        bio: user.bio || 'Hello everyone',
      };

      // Sign Token
      jwt.sign(payload, keys.secretOrkey, {expiresIn: 3600}, (err, token) => {
        res.json({
          success: true,
          token: 'Bearer ' + token,
        });
      });
    } else {
      errors.password = 'Password incorrect';
      return res.status(400).json(errors);
    }
  } catch (err) {
    console.log(err);
  }
};

// @route POST api/users/current
// @desc Return current user
// @access Private
exports.postCurrent = (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
  });
};

// @route POST api/users/
// @desc Change user profile
// @access Private
exports.postProfile = async (req, res) => {
  try {
    console.log(req.user, req.body);
    // Check for user
    if (!req.user) {
      errors.profile = 'User not found';
      return res.status(404).json(errors);
    }

    const newProfile = await User.findOneAndUpdate(
      {_id: req.user.id},
      {
        $set: {
          name: req.body.name,
          bio: req.body.bio,
          avatar: req.body.avatar,
        },
      },
    );
    res.json(newProfile);
  } catch (err) {
    res.status(400).json({nochange: 'Can not change profile, please try again'});
  }
};
