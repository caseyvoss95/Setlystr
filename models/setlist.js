const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Song = require('../models/song.js').schema;
//console.log(Song);


const setlistSchema = new Schema({
    name : {type: String, required: true},
    author: {type: String, required: true},
    quantity : {type: Number, required: true},
    songs : [Song]
});

const Setlist = mongoose.model('Setlist', setlistSchema);

module.exports = Setlist;