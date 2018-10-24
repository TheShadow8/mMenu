const express = require('express');
const router = express.Router();
const passport = require('passport');

const Post = require('../../models/Post');

const validatePostInput = require('../../validation/post');
const uploadImage = require('../../middleware/uploadImage')



// @route   GET api/posts
// @desc    Get posts
// @access  Public
router.get('/', (req, res) => {
    Post.find()
        .sort({
            date: -1
        })
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({
            nopostsfound: 'No posts found'
        }));
});



// @route    POST api/posts
// @desc     Create post
// @accesss  Private
router.post('/', passport.authenticate('jwt', {
    session: false
}), uploadImage, (req, res) => {
    const url = req.protocol + "://" + req.get("host");
    const {
        errors,
        isValid
    } = validatePostInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newPost = new Post({
        user: req.user.id,
        name: req.body.name,
        avatar: req.body.avatar,
        text: req.body.text,
        imagePath: url + "/images/" + req.file.filename,

    })

    newPost
        .save()
        .then(post => res.json(post))
        .catch(err => {
            console.log(err);
        });

})

module.exports = router;