//dependencies
const express = require('express');
const router = express.Router();
const Song = require('../models/song.js');

//index
router.get('/', (req, res) => {
    Song.find({}, (error, foundSongs) => {
        res.render('setlist/index.ejs', {
            songs : foundSongs
        });
    })
});

//new
router.get('/new', (req, res) => {
    res.render('setlist/new.ejs');
})

//create
router.post('/', (req, res) => {
    Song.create(req.body, (error, createdSong) => {
        res.redirect('/setlist');
    })
})

module.exports = router;