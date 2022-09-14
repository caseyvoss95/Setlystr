const mongoose = require('mongoose');
const Song = require('../models/song.js');
const Schema = mongoose.Schema;

const setlistSchema = new Schema({
    name : {type: String, required: true},
    author: {type: String, required: true},
    quantity : {type: Number, required: true},
    songs : [Object]
})

const Setlist = mongoose.model('Setlist', setlistSchema);

module.exports = Setlist;