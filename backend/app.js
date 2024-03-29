const express = require('express');  // import express
const bodyParser = require('body-parser');  // import body-parser
const Post = require('./models/post'); // import the Post model, ensure this is correctly referenced

const mongoose = require('mongoose'); // import mongoose
const postRoutes = require('./routes/post'); // import the post routes

const app = express();  // create express app

// Connect to the database
mongoose.connect(
  'mongodb+srv://autbeam:beamukd.aut2011@cluster0.wdvod6s.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Connection failed!');
  });

// Middleware for parsing JSON and URL encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// CORS headers setup
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});

// Post creation route
app.post("/api/posts", (req, res, next) => {
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
app.get('/api/posts', (req, res, next) => {
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

app.get('/api/posts/:id', (req, res, next) => {
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

app.delete('/api/posts/:id', (req, res, next) => {
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

app.put('/api/posts/:id', (req, res, next) => {
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

app.use("/api/posts", postRoutes);
module.exports = app;  // export the app
