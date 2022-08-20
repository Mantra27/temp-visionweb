const router = require("express").Router({mergeParams: true});
const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const passport = require("passport");
const session = require('express-session');
const {mailMan} = require("../utils/handler");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const path = require("path");
const express = require("express");
const { v4: uuidv4 } = require('uuid');
require('dotenv').config({path: path.resolve(__dirname + '/../.env')});

//-–––––––––––––––––––––––––––––––––––––––––––––
const jwtKey = process.env.jwtkey
const ConnectionT0kenKey = process.env.ConnectionT0kenKey;
//-–––––––––––––––––––––––––––––––––––––––––––––

router.get("/test", async (req:any, res:any, next:any)=>{
    return res.status(200).send({status: 200, message:"/auth endpoint is up and running!"})
});

router.get("/login", (req:any, res:any, next:any)=>{
    return res.sendFile("index.html", {root: "/Users/surge/Desktop/code/dicot/v2/frontend/login/build"})
});

// //passport google strategy
// passport.use(new GoogleStrategy({
//     clientID: "1014276340059-orscm84ijkimm5vp5qkemp1kmjl4cvpe.apps.googleusercontent.com",
//     clientSecret: "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",
//     callbackURL: "http://localhost:3000/auth/login"
// },
//     async (accessToken:any, refreshToken:any, profile:any, done:any)=>{
//         await done(null, profile);
//     }
// ));

passport.use(new LocalStrategy(
    function(username:any, password:any, done:any) {
      User.findOne({ username: username }, function (err:any, user:any) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        bcrypt.compare(password, user.password).then((resolve:any)=>{
            if(!resolve) { return done(null, false);}
            else return done(null, user);
        })
        
      });
    }
  ));

passport.serializeUser(function(user:any, done:any) {
    done(null, user);
});

passport.deserializeUser(function(user:any, done:any) {
    done(null, user);
});

//google oauth functionalities
// router.get("/google", passport.authenticate("google", {scope: ["profile"]}));

// router.get("/google/callback", passport.authenticate("google", {
//     successRedirect: "http://localhost:8080/",
//     failureRedirect: "/auth/login"
// }));

router.post("/googleCallback", (req:any, res:any)=>{
    console.log('trying to set google token')
    const body = req.body;
    const Ip = "0.0.0.0";
    
    User.find({email: body.body.profileObj.email}).then(async (resolve:any)=>{
      if(resolve && resolve.lastKnownLoginMethod == "traditional") return res.status(200).send({status:404, message:"account already exists"});
      if(resolve.country != "google-login-cant-have-location"){
        //user logged in for the first time via google account

        const userConnectionToken = await jwt.sign({username:body.body.profileObj.name, email: body.body.profileObj.email, time: new Date().getTime()}, ConnectionT0kenKey);
        const setNewUser = new User({
            username: body.body.profileObj.name,
            email: body.body.profileObj.email,
            password: JSON.stringify(body),
            country: 'google-login-cant-have-location',
            contactNumber: 'google-login-cant-have-mobile-number',
            isEmailVerified: false,
            role:"admin",
            connectionToken: userConnectionToken,
            lastKnownLoginMethod: "google-oauth",
            avatar:body.body.profileObj.imageUrl
        });

        await setNewUser.save();
        const token = jwt.sign({ip:Ip, creation: new Date().getTime, expires: null, username: body.body.profileObj.name}, jwtKey);
        return res.status(200).send({status:200, message:"google-login-authed in server", token: token});
      }
      else{
        //check google id = 110640823953278084718
        console.log("old google account", resolve)
        const token = jwt.sign({ip:Ip, creation: new Date().getTime, expires: null, username: body.body.profileObj.name}, jwtKey);
        return res.status(200).send({status:200, message:"google-login-authed in server", token: token});
      }
    });
});

async function Login(email:any, password:any, res:any){
    if(!email || !password) return res.status(202).send({status: 202, message:"username or password is in invalid format from the client's end"});

    await User.findOne({email: email}).then(async (user:any)=>{
        if(user){
            bcrypt.compare(password, user.password, (err:any, isMatch:any)=>{
                if(err){ console.log("had error while matching passwords"); return res.json({status:404, message: 'cannot match password'});}
                //jwt token will be given here...

                if(isMatch){
                    const Ip = "0.0.0.0";
                    const token = jwt.sign({ip:Ip, creation: new Date().getTime, expires: null, username: user.username}, jwtKey);
                    return res.json({token:token, status: 'ok', message: "login done(t0ken also sent)"})
                }
                else return res.json({status: 404, message: "wrong password"});
            })
        }
        else return res.json({status: 404, message:"no email found on records"});
        
    }).catch((ERRor:any)=>{
        console.log(ERRor);
    })
}

//tradition login method
router.post("/login", async (req:any, res:any, next:any) => {
    try{
        await Login(req?.body?.email, req.body?.password, res);
    }
    catch(LoginError){
        console.log(LoginError);
    }
});

// //passport method
// router.post('/login', 
//   passport.authenticate('local', { failureRedirect: '/login' }),
//   function(req:any, res:any) {
//     res.redirect('localhost:3000/billing');
//   });

router.get("/localLoginDone", (req:any, res:any)=>{
    res.status(200).send("<h1>login done</h1>");
});

router.post("/verifyjwt", (req:any, res:any)=>{
    const {token, Ip} = req.body;
    jwt.verify(token, jwt.verify, (decoded:any)=>{
        console.log("cookie is expired, redirecting user to login/register");
        if((-decoded.creation) + (new Date().getTime()) > decoded.expires) return res.redirect("/");
        if(Ip == decoded.ip){
            return res.status(200).json({statusCode:200, message:"jwt verified", token: token, jwtKey});
        }
        else return res.redirect("/");
    })
});

router.post("/register", async (req:any, res:any)=>{
    if(!req.body.username || !req.body.email || !req.body.password || !req.body.contactNumber || !req.body.country) return res.status(200).send({status: 404, message: "One of your input field(s) is missing from your side"});
    const {username, email, password, country, contactNumber, role = "admin"} = req.body;

    await User.findOne({email : email}).exec(async (err2:any, user:any)=>{

        if(!user){
        	await User.findOne({username: username}).exec(async (err2:any, user2:any)=>{

        		if(!user2){
                    const userConnectionToken = await jwt.sign({username:username, email:email, time: new Date().getTime()}, ConnectionT0kenKey);
        			const setNewUser = new User({
                        username: username,
                        email: email,
                        password: password,
                        country: country,
                        contactNumber: contactNumber,
                        isEmailVerified: false,
                        role:"admin",
                        connectionToken: userConnectionToken,
                        avatar:`https://avatars.dicebear.com/api/bottts/${uuidv4()}.svg`,
                        lastKnownLoginMethod:"traditional",
                    });
                        bcrypt.genSalt(10, async (err:any, salt:any)=> 
                                bcrypt.hash(setNewUser.password,salt, (err:any, hash:any)=> {
                                    if(err) return res.status(200).send({status: 404, message:"error generating hash from the server, mail us on nandan@dicot.in"});
                                        setNewUser.password = hash;
                                        setNewUser.save()
                                    .then((value:any)=>{
                                        console.log('a user succesfully registered', setNewUser.email);
                                        //do login him
                                        
                                        return Login(email, password, res);
                                    })
                                    .catch((value:any) => console.log(value));
                        }));
        		}
        		else{
                    return res.status(200).send({status:404, message: "Sorry but that username is already in use"})
        		}
    		});
    
        }
        else{
            return res.status(200).send({status:404, message: "Sorry but that email is already in use"})
        }
    });
});

router.get('/logout', function(req:any, res:any, next:any) {
    req.logout(function(err:any) {
      if (err) { return next(err); }
      res.redirect('/');
    });
});

router.get("/*", (req:any, res:any, next:any)=>{
    return res.redirect("/404");
});

export {}
module.exports = router;