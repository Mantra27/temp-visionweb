'use strict'

//modules
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const index = require("./routes/index");
const entry = require("./routes/dataEntry");
const cors = require("cors");
const wh = require("./routes/serverWh");
const auth = require("./routes/auth");
const passport = require("passport");
const session = require("express-session");

require('dotenv').config({path: path.resolve(__dirname+'/.env')});

//general purpose middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//auth and 0auth middlewares
app.use(session({ secret: process.env.sessionSecret, saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());

//view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('/Users/surge/Desktop/code/dicot/v2/frontend/register/build'))
console.log("Starting the server...\n");

mongoose.connect(process.env.DBURL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((res:any)=>{
        console.log(`http://localhost:${process.env.PORT || 8080}`); 
            //all the root backend endpoints
            app.use('/', index);
            app.use('/auth', auth);
            app.use('/db', entry);
            app.use('/wh', wh);

        //starting the server
        app.listen(process.env.port || 8080);

    }).catch((LaunchingError:any)=>{
        console.log("unable to establish connection to the server", LaunchingError);
    });
