const express = require('express');
const router = express.Router();
const { User, Post, Album, Todo } = require('../models');
const { parseQuery, buildQuery } = require('../middleware/queryHelper');

// GET all users
router.get('/', parseQuery, async (req, res) => {
  try {
    const users = await buildQuery(User, req).select('-_id -__v');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params.id }).select('-_id -__v');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET user's posts
router.get('/:id/posts', parseQuery, async (req, res) => {
  try {
    req.filters.userId = parseInt(req.params.id);
    const posts = await buildQuery(Post, req).select('-_id -__v');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET user's albums
router.get('/:id/albums', parseQuery, async (req, res) => {
  try {
    req.filters.userId = parseInt(req.params.id);
    const albums = await buildQuery(Album, req).select('-_id -__v');
    res.json(albums);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET user's todos
router.get('/:id/todos', parseQuery, async (req, res) => {
  try {
    req.filters.userId = parseInt(req.params.id);
    const todos = await buildQuery(Todo, req).select('-_id -__v');
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create user
router.post('/', async (req, res) => {
  try {
    const lastUser = await User.findOne().sort({ id: -1 });
    const newId = lastUser ? lastUser.id + 1 : 1;
    const user = { id: newId, ...req.body };
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update user
router.put('/:id', async (req, res) => {
  try {
    const user = { id: parseInt(req.params.id), ...req.body };
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PATCH partial update user
router.patch('/:id', async (req, res) => {
  try {
    const existingUser = await User.findOne({ id: req.params.id }).select('-_id -__v').lean();
    if (!existingUser) return res.status(404).json({ error: 'User not found' });
    const user = { ...existingUser, ...req.body };
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE user
router.delete('/:id', async (req, res) => {
  try {
    res.json({});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
