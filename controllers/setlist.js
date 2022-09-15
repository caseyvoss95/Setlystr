//dependencies
const express = require('express');
const Song = require('../models/song.js');
const Setlist = require('../models/setlist.js');
const router = express.Router();


//seed
const songSeed = require('../models/songSeed.js');

//new index
router.get('/', (req, res) => {
    //console.log('index route reached');
    Setlist.findById('6321ecef41983ff3f54641e5', (error, foundSetlist) => {
        //console.log(foundSetlist.songs);
        //console.log(foundSetlist.quantity);
        //calculate setlist duration
        let durationSum = 0;
        foundSetlist.songs.forEach(song => {
            durationSum += song.duration;
        })
        //calculate total cost ($100 per hour is default)
        totalCost = durationSum * (10 / 6);
        res.render('setlist/index.ejs', { setlist: foundSetlist, songs: foundSetlist.songs, totalDuration: durationSum, cost: totalCost })
    });
});

//seed
router.get('/seed', (req, res) => {
    Song.deleteMany({}, (error, allSongs) => { });

    Song.create(songSeed, (error, allSongs) => {
        Setlist.findById('6321ecef41983ff3f54641e5', (error, foundSetlist) => {
            console.log('setlist found pushing to array')
            songSeed.forEach(song => {
                foundSetlist.songs.push(song);
            })
            foundSetlist.save();
            res.redirect('/setlist');
        })
    });
});

// //index
// router.get('/', (req, res) => {
//     Song.find({}, (error, foundSongs) => {
//         //calculate setlist duration
//         let durationSum = 0;
//         foundSongs.forEach(song => {
//             durationSum += song.duration;
//         })
//         //calculate total cost ($100 per hour is default)
//         totalCost = durationSum * (10 / 6);


//         res.render('setlist/index.ejs', {
//             songs: foundSongs, totalDuration: durationSum, cost: totalCost
//         });
//     });
// });

//new
router.get('/new', (req, res) => {
    res.render('setlist/new.ejs');
});

//destroy
router.delete('/:id', (req, res) => {
    Setlist.findById('6321ecef41983ff3f54641e5', (error, foundSetlist) => {
        foundSetlist.songs.forEach((song, index) => {
            if (song._id.toString() === req.params.id) {
                foundSetlist.songs.splice(index, 1);
                foundSetlist.quantity -= 1;
                foundSetlist.save();
                Song.findByIdAndRemove(req.params.id, req.body, (error, foundSong) => {
                    res.redirect('/setlist');
                });
            };
        });
    });
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
        Setlist.findById('6321ecef41983ff3f54641e5', (error, foundSetlist) => {
            console.log('setlist found, adding song');
            //console.log(foundSetlist);
            //console.log(createdSong);
            foundSetlist.songs.push(createdSong);
            foundSetlist.quantity += 1;
            foundSetlist.save();
            console.log('headed back to test route');
            res.redirect('/setlist');
        });
    });
});

//edit
router.get('/:id/edit', (req, res) => {
    Song.findById(req.params.id, (error, foundSong) => {
        res.render('setlist/edit.ejs', {
            song: foundSong
        });
    });
});

//show
router.get('/:id', (req, res) => {
    Song.findById(req.params.id, (error, foundSong) => {
        res.render('setlist/show.ejs', {
            song: foundSong
        });
    });
});

module.exports = router;