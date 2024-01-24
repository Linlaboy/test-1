const mongoose = require('mongoose');  // import mongoose

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }
});  // create a schema

module.exports = mongoose.model('Post', postSchema); // create a model named Post using the postSchema
