'use strict'

//alpha and the omegas
const path = require('path'),
express = require('express'),
mongoose = require('mongoose'),
app = express();

//route modules
const index = require("./routes/index"),
entry = require("./routes/dataEntry"),
api = require("./routes/api"),
auth = require("./routes/auth")
// bigbrain = require("./routes/bigbrain"),
// dangerZone = require("./routes/💀zone"),
// Payments = require("./routes/payments")

//util modules
const passport = require("passport"),
session = require("express-session"),
//{ execSync } = require("child_process"),
cors = require("cors"),
fileUpload = require('express-fileupload');
require('dotenv').config({path: path.resolve(__dirname + '/../../.env')});

// middlwares/cors
// app.use(express.static("/Users/surge/Desktop/code/dicot/v2/frontend/build"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload()); //for email files suppor
app.use(session({ secret: process.env.sessionSecret, saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());
app.set('view engine', 'ejs'); //ejs engine support
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
            // app.use('/bigbrainbeta', bigbrain);
            // app.use('/dangerzone', dangerZone)
            // app.use('/payment', Payments)
            
        //starting the server (backend[8080] -- frontend[3000])
        app.listen(process.env.port || 8080);


        // to initialize frontend with backend, but it didnt work as expected
        // const result = execSync(`cd ${__dirname}/../frontend && npm start`);

    }).catch((LaunchingError:any)=>{
        console.log("unable to establish connection to the server", LaunchingError);
});