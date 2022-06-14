const mongoose = require('mongoose');
const express = require('express');
const Post = require('../models/Post');
const User = require('../models/User');
const validatePostInput = require('../validation/validatePost');

const router = express.Router();

//Get all Posts
router.get('/', (req, res) => {
  console.log(res)
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }))
})

// Get post by id
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ nopostfound: 'No post found with that ID' })
    )
});


module.exports = router;

