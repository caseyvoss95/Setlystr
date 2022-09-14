//dependencies
const express = require('express');
const { findByIdAndUpdate } = require('../models/song.js');
const Song = require('../models/song.js');
const Setlist = require('../models/setlist.js');
const router = express.Router();


//seed
const songSeed = require('../models/songSeed.js');

router.get('/test', (req, res) => {
    console.log('test')
    const testSong = {
        title: 'Say it aint so',
        artist: ['Johann Sebastian Bach'],
        duration: 2,
        genre: ['classical', 'baroque'],
        religion: false
    };

 
    const testObject = Song.create(testSong, (error, createdSong) => {
        console.log('song built');
    });

    const testSetlist = {
        name: 'first setlist',
        author: 'Casey Voss',
        quantity: 1,
        songs: testObject
    }

    Setlist.create(testSetlist, (error, createdSetlist) => {
        res.redirect('/setlist');
    });
});


router.get('/seed', (req, res) => {
    Song.deleteMany({}, (error, allSongs) => {});

    Song.create(songSeed, (error, allSongs) => {
        res.redirect('/setlist');
    }); 
});

//index
router.get('/', (req, res) => {
    Song.find({}, (error, foundSongs) => {
        //calculate setlist duration
        let durationSum = 0;
        foundSongs.forEach(song => {
            durationSum += song.duration;
        })
        //calculate total cost ($100 per hour is default)
        totalCost = durationSum * (10 / 6);


        res.render('setlist/index.ejs', {
            songs: foundSongs, totalDuration : durationSum, cost : totalCost
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
        res.redirect('/setlist');
    })
});

//update 
router.put('/:id', (req, res) => {
    Song.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, updatedSong) => {
        console.log('updating');
        res.redirect(`/setlist/${req.params.id}`);
    })
});

//create
router.post('/', (req, res) => {
    Song.create(req.body, (error, createdSong) => {
        if (error) {
            res.render('setlist/new.ejs');
            return;
        }
        res.redirect('/setlist');
    })
});

//edit
router.get('/:id/edit', (req, res) => {
    Song.findById(req.params.id, (error, foundSong) => {
        res.render('setlist/edit.ejs', {
            song : foundSong
        });
    });
});

//show
router.get('/:id', (req, res) => {
    Song.findById(req.params.id, (error, foundSong) => {
        res.render('setlist/show.ejs', {
            song : foundSong
        });
    });
});

module.exports = router;