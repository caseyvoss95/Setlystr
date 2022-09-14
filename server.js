//dependencies
const express = require("express");
const mongoose = require("mongoose"); 
const setlistController = require('./controllers/setlist.js');
const methodOverride = require('method-override')


require("dotenv").config();
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

//database connection
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use('/setlist', setlistController);

//heroku test//
app.get('/', (req, res) => {
    res.send('hello world');
})

//listener//
const PORT = process.env.PORT;
app.listen(PORT || 3000, ()=> {
    console.log("setlystr running");
});
//