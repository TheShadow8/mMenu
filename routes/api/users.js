const express = require('express');
const router = express.Router();

const passport = require('passport');
const userController = require('../../controllers/user');

// @route POST api/users/register
// @desc Register user
// @access Public
router.post('/register', userController.postRegister);

// @route POST api/users/login
// @desc Login user / Returning JWT token
// @access Public
router.post('/login', userController.postLogin);

// @route POST api/users/:id
// @desc Return current user profile
// @access Private
router.get('/:id', passport.authenticate('jwt', {session: false}), userController.getProfile);

// @route POST api/users/
// @desc Change user profile
// @access Private
router.post('/', passport.authenticate('jwt', {session: false}), userController.postProfile);

module.exports = router;
