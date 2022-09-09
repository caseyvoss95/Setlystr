//dependencies
const express = require("express");
const mongoose = require("mongoose"); 
const methodOverride = require('method-override')

const app = express();
require("dotenv").config(); 

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

//listener
const PORT = process.env.PORT;
app.listen(PORT, ()=> {
    console.log("setlystr running");
})