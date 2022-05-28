'use strict'

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const index = require("./routes/index");
const entry = require("./routes/dataEntry");
const cors = require("cors");
const wh = require("./routes/serverWh");
const auth = require("./routes/auth");

//middlewaress
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');

console.log("starting the server...");

//trying to connect to the db

mongoose.connect("mongodb+srv://dicot-user-93:A1O2SKNmbWYTQtKY@cluster0.q2qww.mongodb.net/dicotv2?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true})
    .then((res:any)=>{

        console.log('------established connection to the server------');
        app.use('/', index);
        app.use('/auth', auth);
        app.use('/db', entry);
        app.use('/wh', wh);

        //starting the server
        app.listen(process.env.PORT || 3000);

    })
    .catch((e:any)=>{
        console.log("unable to establish connection to the server", e);
    });