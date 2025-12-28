const express = require('express');
const router = express.Router();
const { Todo } = require('../models');
const { parseQuery, buildQuery } = require('../middleware/queryHelper');

// GET all todos
router.get('/', parseQuery, async (req, res) => {
  try {
    const todos = await buildQuery(Todo, req).select('-_id -__v');
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET todo by ID
router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.findOne({ id: req.params.id }).select('-_id -__v');
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create todo
router.post('/', async (req, res) => {
  try {
    const lastTodo = await Todo.findOne().sort({ id: -1 });
    const newId = lastTodo ? lastTodo.id + 1 : 1;
    const todo = { id: newId, ...req.body };
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update todo
router.put('/:id', async (req, res) => {
  try {
    const todo = { id: parseInt(req.params.id), ...req.body };
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PATCH partial update todo
router.patch('/:id', async (req, res) => {
  try {
    const existingTodo = await Todo.findOne({ id: req.params.id }).select('-_id -__v').lean();
    if (!existingTodo) return res.status(404).json({ error: 'Todo not found' });
    const todo = { ...existingTodo, ...req.body };
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE todo
router.delete('/:id', async (req, res) => {
  try {
    res.json({});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
