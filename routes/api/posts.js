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

// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @access  Private
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), postController.postComment);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
router.post('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), postController.deleteComment);

module.exports = router;
