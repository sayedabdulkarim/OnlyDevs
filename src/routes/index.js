const express = require('express');
const router = express.Router();

const usersRoutes = require('./users');
const postsRoutes = require('./posts');
const commentsRoutes = require('./comments');
const albumsRoutes = require('./albums');
const photosRoutes = require('./photos');
const todosRoutes = require('./todos');

router.use('/users', usersRoutes);
router.use('/posts', postsRoutes);
router.use('/comments', commentsRoutes);
router.use('/albums', albumsRoutes);
router.use('/photos', photosRoutes);
router.use('/todos', todosRoutes);

module.exports = router;
