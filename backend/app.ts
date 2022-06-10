'use strict'
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const index = require("./routes/index");
const entry = require("./routes/dataEntry");
const cors = require("cors");
const wh = require("./routes/serverWh");
const auth = require("./routes/auth");

require('dotenv').config({path: path.resolve(__dirname+'/.env')});
//middlewaress
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
console.log("starting the server...");

//trying to connect to the db
mongoose.connect(process.env.DBURL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((res:any)=>{

        console.log(`------established connection to the server------(${process.env.port || 8080})`); 

            app.use('/', index);
            app.use('/auth', auth);
            app.use('/db', entry);
            app.use('/wh', wh);
            
        //starting the server
        app.listen(process.env.port || 8080);

    })
    .catch((e:any)=>{
        console.log("unable to establish connection to the server", e);
    });
