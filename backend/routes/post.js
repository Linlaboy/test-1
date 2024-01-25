const express = require('express');

const Post = require('../models/post'); // import the Post model, ensure this is correctly referenced

const router = express.Router();

// Post creation route
router.post("/api/posts", (req, res, next) => {
  const post = new Post({  // create a new Post object

    title: req.body.title,
    content: req.body.content
  });

  post.save().then(createdPost => {
    res.status(201).json({
      message: 'Post added successfully',
      postId: createdPost._id
    });
  }).catch(err => {
    res.status(500).json({
      message: 'Error creating post'
    });
  });
});


// Get posts route
router.get( (req, res, next) => {
  Post.find()
    .then(documents => {
      console.log(documents);
      res.status(200).json({
        message: 'Posts fetched successfully!',
        posts: documents
      });
    }).catch(err => {
      res.status(500).json({
        message: 'Error fetching posts'
      });
    });
});

router.get('/:id', (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({
        message: 'Post not found'
      });
    }
  }).catch(err => {
    res.status(500).json({
      message: 'Error fetching post'
    });
  });
});

router.delete('/:id', (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({
      message: 'Post deleted!'
    });
  }).catch(err => {
    res.status(500).json({
      message: 'Error deleting post'
    });
  });
});

router.put('/:id', (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({ _id: req.params.id }, post).then(result => {
    console.log(result);
    res.status(200).json({
      message: 'Update successful!'
    });
  }).catch(err => {
    res.status(500).json({
      message: 'Error updating post'
    });
  });
});

module.exports = router;  // export the router
