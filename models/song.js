const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = new Schema({
    title: String,
    artsts: [String],
    duration: Number,
    genres: [String],
    religion: String
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;