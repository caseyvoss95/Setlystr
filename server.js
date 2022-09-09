//dependencies
const express = require("express");
const mongoose = require("mongoose"); 
const methodOverride = require('method-override')

const app = express();
const setlistController = require('./controllers/setlist.js');

require("dotenv").config(); 

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use('/setlist', setlistController);

//listener
const PORT = process.env.PORT;
app.listen(PORT, ()=> {
    console.log("setlystr running");
});