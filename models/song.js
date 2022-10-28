const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = new Schema({
    title: {type: String, required: true},
    artist: {type: [String], required: true},
    duration: {type: Number, required: true, min: 1},
    genre: [String],
    religion: String,
    inSetlist: Boolean
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;