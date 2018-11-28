const express = require('express');
const router = express.Router();
const passport = require('passport');
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
  postController.postPost
);

// @route   GET api/posts/user/:id
// @desc    Get post by user id
// @access  Private
router.get('/user/:id', passport.authenticate('jwt', { session: false }), postController.getUserPosts);

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get('/:id', postController.getPost);

// @route   GET api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Public
router.get('/comment/:id/:comment_id', postController.getComment);

// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @access  Private
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), postController.postComment);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), postController.deleteComment);

// @route   POST api/posts/like/:id
// @desc    Like post
// @access  Private
router.post('/like/:id', passport.authenticate('jwt', { session: false }), postController.likePost);

// @route   POST api/posts/unlike/:id
// @desc    Unlike post
// @access  Private
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), postController.unlikePost);

module.exports = router;
