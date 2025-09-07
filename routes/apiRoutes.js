const express = require('express');
const router = express.Router();

const tvShows = require('../controllers/tvShows');

// Create a new tvshow
router.post('/tvshow', tvShows.createTvShow);

// Read all tvshows
router.get('/tvshows', tvShows.readTvShows);

// Read a specific tvshow by ID
router.get('/tvshow/:id', tvShows.readTvShow);

// // Update a tvshow by ID
router.put('/tvshow/:id', tvShows.updateTvShow);

// Delete a tvshow by ID
router.delete('/tvshow/:id', tvShows.deleteTvShow);

module.exports = router;