const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Post = require('../../models/Post');

const validatePostInput = require('../../validation/post');

// @route    POST api/posts
// @desc     Create post
// @accesss  Private

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {

    const { errors, isValid } = validatePostInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newPost = new Post({
        user: req.user.id,
        name: req.body.name,
        avatar: req.body.avatar,
        text: req.body.text
    })

    newPost
        .save()
        .then(post => res.json(post));

})

module.exports = router;