const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  albumId: { type: Number, required: true, ref: 'Album' },
  title: { type: String, required: true },
  url: { type: String, required: true },
  thumbnailUrl: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Photo', photoSchema);
