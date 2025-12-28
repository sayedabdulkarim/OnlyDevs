const express = require('express');
const router = express.Router();
const { Photo } = require('../models');
const { parseQuery, buildQuery } = require('../middleware/queryHelper');

// GET all photos
router.get('/', parseQuery, async (req, res) => {
  try {
    const photos = await buildQuery(Photo, req).select('-_id -__v');
    res.json(photos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET photo by ID
router.get('/:id', async (req, res) => {
  try {
    const photo = await Photo.findOne({ id: req.params.id }).select('-_id -__v');
    if (!photo) return res.status(404).json({ error: 'Photo not found' });
    res.json(photo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create photo
router.post('/', async (req, res) => {
  try {
    const lastPhoto = await Photo.findOne().sort({ id: -1 });
    const newId = lastPhoto ? lastPhoto.id + 1 : 1;
    const photo = { id: newId, ...req.body };
    res.status(201).json(photo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update photo
router.put('/:id', async (req, res) => {
  try {
    const photo = { id: parseInt(req.params.id), ...req.body };
    res.json(photo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PATCH partial update photo
router.patch('/:id', async (req, res) => {
  try {
    const existingPhoto = await Photo.findOne({ id: req.params.id }).select('-_id -__v').lean();
    if (!existingPhoto) return res.status(404).json({ error: 'Photo not found' });
    const photo = { ...existingPhoto, ...req.body };
    res.json(photo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE photo
router.delete('/:id', async (req, res) => {
  try {
    res.json({});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
