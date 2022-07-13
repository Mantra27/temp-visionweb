const router = require("express").Router({mergeParams: true});
const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const passport = require("passport");
const session = require('express-session');
const {mailMan} = require("../utils/handler");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const path = require("path");
const express = require("express");

router.get("/test", async (req:any, res:any, next:any)=>{
    return res.status(200).send({status: 200, message:"/auth endpoint is up and running!"})
});

router.get("/login", (req:any, res:any, next:any)=>{
    return res.sendFile("index.html", {root: "/Users/surge/Desktop/code/dicot/v2/frontend/login/build"})
});

//passport google strategy
passport.use(new GoogleStrategy({
    clientID: "535160641097-gtspudrunafmu9b2ua4581jb3o40cd8v.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8080/auth/google/callback"
},
    async (accessToken:any, refreshToken:any, profile:any, done:any)=>{
        await done(null, profile);
    }
));

passport.serializeUser(function(user:any, done:any) {
    done(null, user);
});

passport.deserializeUser(function(user:any, done:any) {
    done(null, user);
});

//google oauth functionalities
router.get("/google", passport.authenticate("google", {scope: ["profile"]}));
router.get("/google/callback", passport.authenticate("google", {
    successRedirect: "http://localhost:8080/",
    failureRedirect: "/auth/register"
}));

router.post("/login", async (req:any, res:any)=>{
    const {email, password} = req.body;
    if(!email || !password) return res.status(202).send({status: 202, message:"username or password is in invalid format from the client's end"});

    await User.findOne({email: email}).then(async (user:any)=>{
        if(user){
            bcrypt.compare(password, user.password, (err:any, isMatch:any)=>{
                if(err) return res.json({status:404, message: 'cannot match password'});
                //jwt token will be given here...
                if(isMatch) return res.json({status: 'ok', message: "login done"});
                else return res.json({status: 404, message: "wrong password"});
            })
        }
        else return res.json({status: 404, message:"no email found"});
        
    }).catch((ERRor:any)=>{
        console.log(ERRor);
    })
    console.log("trying to log in");
});

router.post("/register", async (req:any, res:any)=>{

    if(!req.body.username || !req.body.email || !req.body.password || !req.body.contactNumber || !req.body.country) return res.status(404).send({message: "any of the query is missing from the client's end."});
    const {username, email, password, country, contactNumber} = req.body;

    await User.findOne({email : email}).exec(async (err2:any, user:any)=>{
        if(!user){

        	await User.findOne({username: username}).exec(async (err2:any, user2:any)=>{

        		if(!user2){
        			const setNewUser = new User({
                        username: username,
                        email: email,
                        password: password,
                        country: country,
                        contactNumber: contactNumber,
                        isEmailVerified: false
                    });
                        bcrypt.genSalt(10, async (err:any, salt:any)=> 
                                bcrypt.hash(setNewUser.password,salt, (err:any, hash:any)=> {
                                        if(err) return res.status(404).send({status: 202, message:"error generating hash from the server, mail us on nandan@dicot.in"});
                                        setNewUser.password = hash;
                                        setNewUser.save()
                                        .then((value:any)=>{
                                            // console.log('a user succesfully registered', setNewUser);
                                            return res.json({status: 'ok', message:'user registered'})
                                        })
                                        .catch((value:any) => console.log(value));
                        }));
        		}
        		else{
        			console.log("user already exists(same username)");
                    return res.status(404).send({message: "user already exists(same username)"})
        		}
    		});
    
        }
        else{
        	console.log("user already exists(same email)");
            return res.status(404).send({message: "user already exists(same email)"})
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