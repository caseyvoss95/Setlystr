const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = new Schema({
    title: String,
    artist: String,
    genre: String,
    religion: String,
    duration: Number
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;