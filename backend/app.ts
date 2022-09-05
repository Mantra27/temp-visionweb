'use strict'

//modules
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const index = require("./routes/index");
const entry = require("./routes/dataEntry");
const cors = require("cors");
const api = require("./routes/api");
const auth = require("./routes/auth");
const passport = require("passport");
const session = require("express-session");
const { execSync } = require("child_process"); 
const fileUpload = require('express-fileupload');

require('dotenv').config({path: path.resolve(__dirname + '/.env')});

// middlwares/cors
// app.use(express.static("/Users/surge/Desktop/code/dicot/v2/frontend/build"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload());
app.use(session({ secret: process.env.sessionSecret, saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//loading static pages
console.log("Starting the server...")
mongoose.connect(process.env.DBURL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((res:any)=>{  
        console.log(`http://localhost:${process.env.PORT || 8080}`); 

            //all the root backend endpoints
            app.use('/', index);
            app.use('/auth', auth);
            app.use('/db', entry);  
            app.use('/api', api);
            
        //starting the server (backend[8080] -- frontend[3000])
        app.listen(process.env.port || 8080);
        // const result = execSync(`cd ${__dirname}/../frontend && npm start`);

    }).catch((LaunchingError:any)=>{
        console.log("unable to establish connection to the server", LaunchingError);
});
