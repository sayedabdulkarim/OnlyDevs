const express = require('express');
const router = express.Router();
const { Post, Comment } = require('../models');
const { parseQuery, buildQuery } = require('../middleware/queryHelper');

// GET all posts
router.get('/', parseQuery, async (req, res) => {
  try {
    const posts = await buildQuery(Post, req).select('-_id -__v');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findOne({ id: req.params.id }).select('-_id -__v');
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET post's comments
router.get('/:id/comments', parseQuery, async (req, res) => {
  try {
    req.filters.postId = parseInt(req.params.id);
    const comments = await buildQuery(Comment, req).select('-_id -__v');
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create post
router.post('/', async (req, res) => {
  try {
    const lastPost = await Post.findOne().sort({ id: -1 });
    const newId = lastPost ? lastPost.id + 1 : 1;
    const post = { id: newId, ...req.body };
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update post
router.put('/:id', async (req, res) => {
  try {
    const post = { id: parseInt(req.params.id), ...req.body };
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PATCH partial update post
router.patch('/:id', async (req, res) => {
  try {
    const existingPost = await Post.findOne({ id: req.params.id }).select('-_id -__v').lean();
    if (!existingPost) return res.status(404).json({ error: 'Post not found' });
    const post = { ...existingPost, ...req.body };
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE post
router.delete('/:id', async (req, res) => {
  try {
    res.json({});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
