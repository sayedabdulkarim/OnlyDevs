const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  postId: { type: Number, required: true, ref: 'Post' },
  name: { type: String, required: true },
  email: { type: String, required: true },
  body: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);
