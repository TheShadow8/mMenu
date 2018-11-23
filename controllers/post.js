const Post = require('../models/Post');
const validatePostInput = require('../validation/post');

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
exports.postPost = async (req, res) => {
  const url = req.protocol + '://' + req.get('host');
  const { errors, isValid } = validatePostInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newPostData = new Post({
    user: req.user.id,
    name: req.body.name,
    avatar: req.body.avatar,
    text: req.body.text,
    imagePath: url + '/images/' + req.file.filename
  });

  try {
    const newPost = await newPostData.save();
    res.json(newPost);
  } catch (err) {
    console.log(err);
  }
};
