const Post = require('../models/Post');
const validatePostInput = require('../validation/post');
const uploadImage = require('../middleware/uploadImage');

// @route   GET api/posts
// @desc    Get posts
// @access  Public
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });

    res.json(posts);
  } catch {
    res.status(404).json({ nopostsfound: 'No posts found' });
  }
};

// @route    POST api/posts
// @desc     Create post
// @accesss  Private
exports.postPost = (req, res) => {
  uploadImage(req, res, async err => {
    if (err) {
      return res.status(400).json({ invalidError: 'Invalid image file' });
    }

    const url = req.protocol + '://' + req.get('host');
    const { errors, isValid } = validatePostInput(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    try {
      const newPostData = new Post({
        user: req.user.id,
        name: req.body.name,
        avatar: req.body.avatar,
        title: req.body.title,
        content: req.body.content,
        imagePath: url + '/images/' + req.file.filename
      });

      const newPost = await newPostData.save();
      res.json(newPost);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ postError: 'Create post fail, please try again' });
    }
  });
};

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json(post);
  } catch (err) {
    res.status(404).json({ nopostfound: 'No post found with that ID' });
  }
};

// @route   Get api/posts/comment/:id/:comment_id
// @desc    Get comment
// @access  Public
exports.getComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if comment exists
    if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
      return res.status(404).json({ commentnotexists: 'Comment does not exist' });
    }

    // Get comment index
    const index = post.comments.map(item => item._id.toString()).indexOf(req.params.comment_id);

    res.json(post.comments[index]);
  } catch (err) {
    console.log(err);
    res.status(404).json({ postnotfound: 'No post found' });
  }
};

// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @access  Private
exports.postComment = async (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);

  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    return res.status(400).json(errors);
  }

  try {
    const post = await Post.findById(req.params.id);

    const newComment = {
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    };

    post.comments.unshift(newComment);

    await post.save();
    res.json(post);
  } catch (err) {
    console.log(err.message);
    res.status(404).json({ postnotfound: 'No post found' });
  }
};

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
exports.deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if comment exists
    if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
      return res.status(404).json({ commentnotexists: 'Comment does not exist' });
    }

    // Get remove index
    const removeIndex = post.comments.map(item => item._id.toString()).indexOf(req.params.comment_id);

    post.comments.splice(removeIndex, 1);

    await post.save();
    res.json(post);
  } catch (err) {
    console.log(err.message);
    res.status(404).json({ postnotfound: 'No post found' });
  }
};

// @route   POST api/posts/like/:id
// @desc    Like post
// @access  Private
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
      return res.status(400).json({ alreadyliked: 'User already liked this post' });
    }

    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post);
  } catch (err) {
    console.log(err.message);
    res.status(404).json({ postnotfound: 'No post found' });
  }
};

// @route   POST api/posts/unlike/:id
// @desc    Unlike post
// @access  Private
exports.unlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
      return res.status(400).json({ notliked: 'You have not yet liked this post' });
    }

    const removeIndex = post.likes.map(item => item.user.toString()).indexOf(req.user.id);
    // Splice out of array
    post.likes.splice(removeIndex, 1);

    await post.save();
    res.json(post);
  } catch (err) {
    console.log(err.message);
    res.status(404).json({ postnotfound: 'No post found' });
  }
};
