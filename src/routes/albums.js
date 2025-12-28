const express = require('express');
const router = express.Router();
const { Album, Photo } = require('../models');
const { parseQuery, buildQuery } = require('../middleware/queryHelper');

// GET all albums
router.get('/', parseQuery, async (req, res) => {
  try {
    const albums = await buildQuery(Album, req).select('-_id -__v');
    res.json(albums);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET album by ID
router.get('/:id', async (req, res) => {
  try {
    const album = await Album.findOne({ id: req.params.id }).select('-_id -__v');
    if (!album) return res.status(404).json({ error: 'Album not found' });
    res.json(album);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET album's photos
router.get('/:id/photos', parseQuery, async (req, res) => {
  try {
    req.filters.albumId = parseInt(req.params.id);
    const photos = await buildQuery(Photo, req).select('-_id -__v');
    res.json(photos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create album
router.post('/', async (req, res) => {
  try {
    const lastAlbum = await Album.findOne().sort({ id: -1 });
    const newId = lastAlbum ? lastAlbum.id + 1 : 1;
    const album = { id: newId, ...req.body };
    res.status(201).json(album);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update album
router.put('/:id', async (req, res) => {
  try {
    const album = { id: parseInt(req.params.id), ...req.body };
    res.json(album);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PATCH partial update album
router.patch('/:id', async (req, res) => {
  try {
    const existingAlbum = await Album.findOne({ id: req.params.id }).select('-_id -__v').lean();
    if (!existingAlbum) return res.status(404).json({ error: 'Album not found' });
    const album = { ...existingAlbum, ...req.body };
    res.json(album);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE album
router.delete('/:id', async (req, res) => {
  try {
    res.json({});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
