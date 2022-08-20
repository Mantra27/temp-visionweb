'use strict';
//modules
var path = require('path');
var express = require('express');
var mongoose = require('mongoose');
var app = express();
var index = require("./routes/index");
var entry = require("./routes/dataEntry");
var cors = require("cors");
var api = require("./routes/api");
var auth = require("./routes/auth");
var passport = require("passport");
var session = require("express-session");
var execSync = require("child_process").execSync;
var fileUpload = require('express-fileupload');
require('dotenv').config({ path: path.resolve(__dirname + '/.env') });
//middlwares/cors
// app.use(express.static("/Users/surge/Desktop/code/dicot/v2/frontend/build"))
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(session({ secret: process.env.sessionSecret, saveUninitialized: true, resave: true }));
app.use(passport.initialize());
app.use(passport.session());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//loading static pages
console.log("Starting the server...");
mongoose.connect(process.env.DBURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(function (res) {
    console.log("http://localhost:".concat(process.env.PORT || 8080));
    //all the root backend endpoints
    app.use('/', index);
    app.use('/auth', auth);
    app.use('/db', entry);
    app.use('/api', api);
    //starting the server (backend[8080] -- frontend[3000])
    app.listen(process.env.port || 8080);
    // const result = execSync(`cd ${__dirname}/../frontend && npm start`);
})["catch"](function (LaunchingError) {
    console.log("unable to establish connection to the server", LaunchingError);
});
