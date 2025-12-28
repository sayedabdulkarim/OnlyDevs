const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  userId: { type: Number, required: true, ref: 'User' },
  title: { type: String, required: true },
  completed: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Todo', todoSchema);
