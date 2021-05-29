const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Movies = mongoose.model(
  "Movies",
  new mongoose.Schema({
    moviename: {
      type: String,
      required: true,
    },
    releaseyear: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true
    },
    video: {
      type: String,
      required: true
    },
  })
);

module.exports = Movies;