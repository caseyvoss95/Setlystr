//dependencies
const express = require('express');
const { findByIdAndUpdate } = require('../models/song.js');
const router = express.Router();
const Song = require('../models/song.js');

//index
router.get('/', (req, res) => {
    Song.find({}, (error, foundSongs) => {
        res.render('setlist/index.ejs', {
            songs: foundSongs
        });
    })
});

//new
router.get('/new', (req, res) => {
    res.render('setlist/new.ejs');
});

//destroy
router.delete('/:id', (req, res) => {
    Song.findByIdAndRemove(req.params.id, req.body, (error, foundSong) => {
        console.log(foundSong);
        res.redirect('/');
    })
});

//update 
router.put('/:id', (req, res) => {
    Song.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, updatedSong) => {
        res.redirect(`/setlist/${req.params.id}`);
    })
});

//create
router.post('/', (req, res) => {
    Song.create(req.body, (error, createdSong) => {
        //createdSong.genre[0] = req.body.genre;
        res.redirect('/setlist');
    })
});

//edit
router.get('/:id/edit', (req, res) => {
    Song.findById(req.params.id, (error, foundSong) => {
        res.render('setlist/edit.ejs', {
            song: foundSong
        });
    });
});


module.exports = router;