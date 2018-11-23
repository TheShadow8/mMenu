const express = require('express');
const router = express.Router();
const passport = require('passport');
const uploadImage = require('../../middleware/uploadImage');
const postController = require('../../controllers/post');

// @route   GET api/posts
// @desc    Get posts
// @access  Public
router.get('/', postController.getPosts);

// @route    POST api/posts
// @desc     Create post
// @accesss  Private
router.post(
  '/',
  passport.authenticate('jwt', {
    session: false
  }),
  uploadImage,
  postController.postPost
);

module.exports = router;
