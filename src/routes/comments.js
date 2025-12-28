const express = require('express');
const router = express.Router();
const { Comment } = require('../models');
const { parseQuery, buildQuery } = require('../middleware/queryHelper');

// GET all comments
router.get('/', parseQuery, async (req, res) => {
  try {
    const comments = await buildQuery(Comment, req).select('-_id -__v');
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET comment by ID
router.get('/:id', async (req, res) => {
  try {
    const comment = await Comment.findOne({ id: req.params.id }).select('-_id -__v');
    if (!comment) return res.status(404).json({ error: 'Comment not found' });
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create comment
router.post('/', async (req, res) => {
  try {
    const lastComment = await Comment.findOne().sort({ id: -1 });
    const newId = lastComment ? lastComment.id + 1 : 1;
    const comment = { id: newId, ...req.body };
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update comment
router.put('/:id', async (req, res) => {
  try {
    const comment = { id: parseInt(req.params.id), ...req.body };
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PATCH partial update comment
router.patch('/:id', async (req, res) => {
  try {
    const existingComment = await Comment.findOne({ id: req.params.id }).select('-_id -__v').lean();
    if (!existingComment) return res.status(404).json({ error: 'Comment not found' });
    const comment = { ...existingComment, ...req.body };
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE comment
router.delete('/:id', async (req, res) => {
  try {
    res.json({});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
