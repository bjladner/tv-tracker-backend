const express = require('express');
const router = express.Router();

const tvShows = require('../controllers/tvShows');

// Return all tvshows
router.get('/tvshows', tvShows.readTvShows);

// Return a specific tvshow by ID
router.get('/tvshow/:id', tvShows.readTvShow);

// Add a new tvshow
router.post('/tvshow/:id', tvShows.addTvShow);

// Add a new tvshow
router.post('/tvshow', tvShows.addTvShowJson);

// Update a tvshow by ID
router.patch('/tvshow/:id', tvShows.updateTvShow);

// Delete a tvshow by ID
router.delete('/tvshow/:id', tvShows.deleteTvShow);

// Search for a tvshow by name
router.get('/search/:name', tvShows.tvShowResults);

// Test route
router.get('/', (req, res) => {
    res.send('Welcome to the TVshows API!');
});

module.exports = router;