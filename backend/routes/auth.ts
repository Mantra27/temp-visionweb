const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const passport = require("passport");
const session = require('express-session');
const {mailMan} = require("../utils/handler");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

//auth router test endpoint
router.get("/", (req:any, res:any)=>{
    return res.send({status: 'ok', message: 'auth router is up and running!'})
});

//cookie session for login/google-oauth
router.use(session({ secret: 'amsap@*&$!97sklqmd1_)@$()_!8lkansd2', saveUninitialized: true, resave: true}));
router.use(passport.initialize());
router.use(passport.session());

//passport google strategy
passport.use(new GoogleStrategy({
    clientID: "535160641097-gtspudrunafmu9b2ua4581jb3o40cd8v.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8080/auth/google/callback"
},
    async (accessToken:any, refreshToken:any, profile:any, done:any)=>{
        User.findOneOrCreate()
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
    successRedirect: "http://localhost:8080/auth/google/success",
    failureRedirect: "/auth/register"
}));

router.get("/google/success", (req:any, res:any)=>{
    if(req.user){
        res.status(200).json({success:true, message:"successfull", user: req.user}); 
        //db callback...
    }
    else return res.status(404).json({success:false, message: "not logged in"})
})

router.post("/login", async (req:any, res:any)=>{
    const {email, password} = req.body;
    if(!email && !password) return res.status(202).send({status: 202, message:"username or password is in invalid format from the client's end"});

    await User.findOne({email : email}).exec(async (err:any, user:any)=>{
        if(err) return res.status(err).send({status: 404, message: "error while getting the user"});
        if(user){
            bcrypt.compare(password, user.password, (err:any, isMatch:any)=>{
                if(err) return res.json({status:404, message: 'cannot match password'});
                //jwt token will be given here...
                if(isMatch) return res.json({status: 'ok', message: "login done"});
                return res.json({status: 404, message: "wrong password"});
            })
        }
        else{
            await mailMan("gohilmantra@gmail.com", {subject: "server error!", body:"we got into an error while logging in a user"})
        }
    })
    console.log("trying to log in");
});

router.post("/register", async (req:any, res:any)=>{

    if(!req.body.username || !req.body.email || !req.body.password || !req.body.contactNumber || !req.body.country) return res.status(404).send({message: "any of the query is missing from the client's end."});
    const {username, email, password, country, contactNumber} = req.body;

    await User.findOne({email : email}).exec(async (err2:any, user:any)=>{
        if(!user){

        	await User.findOne({username : username}).exec(async (err2:any, user2:any)=>{
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

//forgot-username....
// router.post("/fu", async (req:any, res:any, next:any)=>{
    
// })

export {}
module.exports = router;