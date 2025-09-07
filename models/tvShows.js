const mongoose = require('mongoose');
const axios = require('axios');

const tvShowSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  tvMazeID: {
    type: Number,
    required: true
  },
  platform: String,
  scheduleDay: [String],
  scheduleTime: String,
  nextEpisode: Date,
  imageLink: String,
});

tvShowSchema.methods.setSchedule = function(showData) {
  if (showData.schedule.days) {
    this.scheduleDay = showData.schedule.days;
  }
  if (showData.schedule.time) {
    this.scheduleTime = showData.schedule.time;
  }
}

tvShowSchema.methods.addPlatform = function(showData) {
  if (showData.network) {
    this.platform = showData.network.name;
  } else if (showData.webChannel) {
    this.platform = showData.webChannel.name;
  } else {
    this.platform = "Not Available";
  }
}

tvShowSchema.methods.addImageLink = function(showData) {
  if (showData.image.medium) {
    this.imageLink = showData.image.medium;
  } else {
    this.imageLink = null;
  }
}

tvShowSchema.methods.getNextEpisode = async function(showData) {
  if (showData._links.nextepisode) {
    const nextEpisodeData = await axios.get(showData._links.nextepisode.href);
    console.log(`Next episode of ${showData.name} is ${nextEpisodeData.data.airdate}`)
    this.nextEpisode = nextEpisodeData.data.airdate;
  } else {
    this.nextEpisode = null;
  }
}

module.exports = mongoose.model('TvShow', tvShowSchema);
