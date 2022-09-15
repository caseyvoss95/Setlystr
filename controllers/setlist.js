//dependencies
const express = require('express');
const { findByIdAndUpdate } = require('../models/song.js');
const router = express.Router();
const Song = require('../models/song.js');
const Setlist = require('../models/setlist.js');


//add song to setlist
router.get('/:id/add', (req, res) => {
    Song.findById(req.params.id, (error, foundSong) => {
        foundSong.inSetlist = true;
        foundSong.save();
        res.redirect('/setlist');
    })
})

//seed
const songSeed = require('../models/songSeed.js');

router.get('/seed', (req, res) => {
    Song.deleteMany({}, (error, allSongs) => { });

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

        Setlist.findById('6321ecef41983ff3f54641e5', (error, clientSetlist) => {
            res.render('setlist/index.ejs', {
                songs: foundSongs,
                totalDuration: durationSum,
                cost: totalCost,
                setlist: clientSetlist.songs
            });
        })
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
        if (!updatedSong) {
           res.redirect(`/setlist/${req.params.id}/edit2`)
        }
        else {
            res.redirect(`/setlist/${req.params.id}`);
        }
    })
});

// //deep update
// router.get('/:id/edit2', (req, res) => {
//     Setlist.findById('6321ecef41983ff3f54641e5', (error, clientSetlist) => {
//         clientSetlist.songs.forEach((song, index) => {
//             console.log(song);
//             if (song._id.toString() === req.params.id){
//                 song.title = 
//             }
//         })
//     })

// })
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
            song: foundSong
        });
    });
});

//show
router.get('/:id', (req, res) => {
    Song.findById(req.params.id, (error, foundSong) => {
        if (!foundSong){ //song is in the client setlist
            // Setlist.findById('6321ecef41983ff3f54641e5', (error, clientSetlist) => {
            //     clientSetlist.songs.forEach((song, index) => {
            //         console.log(song);
            //         if (song._id.toString() === req.params.id){
            //             res.render('setlist/show.ejs', {
            //                 song : clientSetlist.songs[index]
            //             })
            //         }
            //     })
            // })
        }
        else {
          console.log('song found');
            res.render('setlist/show.ejs', {

            song: foundSong
        });  
        } 
    });
});

module.exports = router;