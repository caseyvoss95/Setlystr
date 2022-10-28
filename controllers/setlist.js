//dependencies
const express = require('express');
<<<<<<< HEAD
const router = express.Router();
const Song = require('../models/song.js');
=======
const Song = require('../models/song.js');
const Setlist = require('../models/setlist.js');
const router = express.Router();
>>>>>>> main

//add song to setlist
router.get('/:id/add', (req, res) => {
    Song.findById(req.params.id, (error, foundSong) => {
        foundSong.inSetlist = true;
        foundSong.save();
        res.redirect('/setlist');
    });
});

//remove song from setlist
router.get('/:id/rem', (req, res) => {
    console.log('rem called')
    Song.findById(req.params.id, (error, foundSong) => {
        foundSong.inSetlist = false;
        foundSong.save(); //TODO add new promise here
    });
    res.redirect('/setlist');
});

//seed
const songSeed = require('../models/songSeed.js');

<<<<<<< HEAD
router.get('/seed', (req, res) => {
    Song.deleteMany({}, (error, allSongs) => { });

    Song.create(songSeed, (error, allSongs) => {
        res.redirect('/setlist');
    });
});

//index
=======
//new index
>>>>>>> main
router.get('/', (req, res) => {
    console.log('index route reached');
    Setlist.findById('6321ecef41983ff3f54641e5', (error, foundSetlist) => {
        //console.log(foundSetlist.songs);
        //console.log(foundSetlist.quantity);
        //calculate setlist duration
        let durationSum = 0;
<<<<<<< HEAD
        foundSongs.forEach(song => {
            if (song.inSetlist){
                durationSum += song.duration;
            }
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


=======
        foundSetlist.songs.forEach(song => {
            durationSum += song.duration;
        })
        //calculate total cost ($100 per hour is default)
        totalCost = durationSum * (10 / 6);
        res.render('setlist/index.ejs', { setlist: foundSetlist, songs: foundSetlist.songs, totalDuration: durationSum, cost: totalCost })
    });
>>>>>>> main
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
                return;
            };
        });
    });
    Song.findByIdAndRemove(req.params.id, req.body, (error, foundSong) => {
        res.redirect('/setlist');
    });
});

//update 
router.put('/:id', (req, res) => {
    console.log('entering put');
    
    Song.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, updatedSong) => {
<<<<<<< HEAD
        if (!updatedSong) {
            res.redirect(`/setlist/${req.params.id}/edit2`)
        }
        else {
            res.redirect(`/setlist/${req.params.id}`);
        }
=======
    });
    console.log('song updated');

    Setlist.findById('6321ecef41983ff3f54641e5', (error, foundSetlist) => {
        foundSetlist.songs.forEach((song, index) => {
            console.log('finding by id')
            if (song._id.toString() === req.params.id) {
                console.log('index is ', index)
                //editing setlist song
                foundSetlist.songs[index].title = req.body.title;
                //foundSetlist.songs[index].artist = req.body.arist;
                foundSetlist.songs[index].duration = req.body.duration;
                //foundSetlist.songs[index].genre = req.body.genre;
                console.log('edited setlist song');
                foundSetlist.save();
                console.log('saved setlist song');

                res.redirect(`/setlist/${req.params.id}`);
            };
        });
>>>>>>> main
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
        Setlist.findById('6321ecef41983ff3f54641e5', (error, foundSetlist) => {
            console.log('setlist found, adding song');
            //console.log(foundSetlist);
            //console.log(createdSong);
            foundSetlist.songs.push(createdSong);
            foundSetlist.quantity += 1;
            foundSetlist.save();
            console.log('headed back to test route');
            res.redirect('/setlist');
            console.log('you shouldnt see me');

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
<<<<<<< HEAD
        if (!foundSong) { //song is in the client setlist
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
=======
        res.render('setlist/show.ejs', {
            song: foundSong
        });
>>>>>>> main
    });
});

module.exports = router;