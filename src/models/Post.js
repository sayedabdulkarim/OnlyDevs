const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  userId: { type: Number, required: true, ref: 'User' },
  title: { type: String, required: true },
  body: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
