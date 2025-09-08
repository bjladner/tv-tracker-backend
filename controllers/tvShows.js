const axios = require('axios');
const TvShow = require('../models/tvShows');

const tvMazeAPI = 'https://api.tvmaze.com';

module.exports.addTvShow = async (req,res) => {
  try {
    const response = await axios.get(`${tvMazeAPI}/shows/${req.params.id}`);
    const newShowData = response.data;
    const newShow = new TvShow({
      title: newShowData.name,
      tvMazeID: newShowData.id
    });
    newShow.setSchedule(newShowData);
    newShow.addPlatform(newShowData);
    newShow.addImageLink(newShowData);
    await newShow.getNextEpisode(newShowData);
    console.log(newShow);
    console.log(`Added  ${newShow.title} on ${newShow.platform}`);
    newShow.save();  
    res.status(201).json(newShow);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports.updateTvShow = async (req,res) => {
  try {
    const show = await TvShow.findById(req.params.id);
    const showData = await axios.get(`${tvMazeAPI}/shows/${show.tvMazeID}`);
    show.setSchedule(showData.data);
    show.addPlatform(showData.data);
    show.addImageLink(showData.data);
    await show.getNextEpisode(showData.data);
    console.log(show);
    console.log(`Updated  ${show.title} on ${show.platform}`);
    show.save();  
    res.status(201).json(show);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports.readTvShows =  async (req, res) => {
  try {
    const { platform } = req.query;
    var tvShows = null;
    if (platform) {
      tvShows = await TvShow.find({platform});
    } else {
      tvShows = await TvShow.find({});
    }
    res.json(tvShows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports.readTvShow = async (req,res) => {
  try {
    const show = await TvShow.findById(req.params.id)
    const showData = await axios.get(`${tvMazeAPI}/shows/${show.tvMazeID}`);
    await show.getNextEpisode(showData.data);
    res.json(show);
  } catch(error) {
    console.log(error);
  }
}

module.exports.deleteTvShow = async (req,res) => {
  await TvShow.findByIdAndDelete(req.params.id);
  res.redirect('/tvshows')
}

module.exports.tvShowResults = async (req,res) => {
  try {
    const showName = req.params.name;
    console.log(`Show name is: ${showName}`)
    const searchResults = await axios.get(`${tvMazeAPI}/search/shows?q=${showName}`)
    console.log(`Found ${searchResults.data.length} shows about ${showName}`);
    res.json(searchResults.data);
  } catch(error) {
    console.log(error);
  }
}