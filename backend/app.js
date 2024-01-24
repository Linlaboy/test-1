const express = require('express');  // import express
const bodyParser = require('body-parser');  // import body-parser

const mongoose = require('mongoose'); // import mongoose
const Post = require('./models/post'); // import the Post model, ensure this is correctly referenced

const app = express();  // create express app

// Connect to the database
mongoose.connect('mongodb+srv://autbeam:beamukd.aut2011@cluster0.wdvod6s.mongodb.net/?retryWrites=true&w=majority')
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
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
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

module.exports = app;  // export the app
