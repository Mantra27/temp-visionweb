const router = require('express').Router();
const User = require("../models/user");
const crypt0 = require('crypto');
const nodemailer = require('nodemailer');
const { mailMan } = require('../utils/handler');
const pwdreset = require('../models/pwdresetwh');
const PASSWORD = require('../models/pwdresetwh');
const bcrypt = require('bcrypt');

//--------------------------------------------------
const decryptKey4ev = "xmSJ@*431$#)Zo3"; //secret key to decode email verification urls
const decryptKey4pwdrst = "n@*#sn!)7z3920"; //secret key to decode password reset urls
//--------------------------------------------------

router.get("/verifyme", (req:any, res:any, next:any)=>{
    try{
        //uncooking the unique url
        let decodedValue = crypt0.createDecipher('aes-128-cbc', decryptKey4ev);
        let MydecodedParams = decodedValue.update(req.query.token, 'hex', 'utf8')
        MydecodedParams += decodedValue.final('utf8');
        //responsing the client with ans from the decrypted url
        const q1 = JSON.parse(MydecodedParams);
        User.findOneAndUpdate({email: q1.email}, {isEmailVerified: true}).then((resolve:any)=>{
            if(resolve) return res.render("idle", {username: q1.email})
        })
    }
    catch(e){return res.status(404).send(`<h1>An Error occured, we're redirecting you to the homepage in 3 seconds. </h1><script>setTimeout(()=>{window.location.replace('http://localhost:8080/');}, 3000)</script>`);} 
});

router.post("/requestemailforverification", async (req:any, res:any, next:any)=>{
    try{
        //poster must have 2 parameters(req.body.email, req.body.user)
        if(req.body.email == undefined || req.body.user == undefined) return res.json({status: 404, message: "invalid email/username for email verification"});

        //checking if the user is already verified or not.
        User.findOne({email: req.body.email}).then(async (resolve:any) =>{

            if(resolve.isEmailVerified) return res.status(200).json({status: 200, message:"email already verified!"});
            // 2(email, user) queries will be from user's endpoint
            const tothe = req.body.email;
            const user = req.body.user

            //cooking the unique url
            let mykey = crypt0.createCipher('aes-128-cbc', decryptKey4ev);
            let mystr = mykey.update(`{"user": "${user}", "email":"${tothe}"}`, 'utf8', 'hex')
            mystr += mykey.final('hex');

            //sending the email with the unique url
            await mailMan(tothe, {subject: "Dicot Email Verification", body:`http://localhost:8080/wh/verifyme?token=${mystr}`}).then((resolve:any)=>{
                return res.status(200).send({resolve});
            }).catch((err:any)=>{
                return res.status(500).send(JSON.stringify(err))
            })
        })
    }
    catch(error){
        console.log("!serverWh-line 56!", error);
        return res.status(404).send({status: 404, message:'Internal server error /requestemailverification'});
    }
});

//-> /fp route is to request password reset
router.post("/requestpasswordreset", async (req:any, res:any, next:any)=>{
    const {email, IP = "0.0.0.0"} = req.body;
    try{
        //cooking the unique url
        User.findOne({email: email}).then((resolve:any)=>{
            if(resolve){
                pwdreset.findOne({email: email}).then(async (Resolve:any)=>{
                    if(Resolve) return res.status(200).send({status: 202, message:`user already resetting his password (${email})`});
                    else{
                        const CurrentTime = new Date().getTime();
                        let mykey = crypt0.createCipher('aes-128-cbc', decryptKey4pwdrst);
                        let mystr = mykey.update(`{"email": "${email}", "token":"${resolve.username}", "t":"${CurrentTime}"}`, 'utf8', 'hex')
                        mystr += mykey.final('hex');

                        await mailMan(email, {subject: "@Dicot Password Reset", body:`http://localhost:8080/wh/resetpw?end=${mystr}`}).then((RESOLVE:any)=>{
                            const passwordResetRequest = new pwdreset({
                                email: email,
                                t: CurrentTime,
                                token: resolve.username,
                                ip: IP
                            });
            
                            passwordResetRequest.save().then((resolve:any)=>{
                                console.log("email must be sent");
                                return res.status(202).send({status: 202, message: {respolve: resolve, message: "email also sent"}})
                            });
                        })
                        
                    }
        
                }).catch((error:any)=>{
                    console.log(error);
                    return res.status(404).send({status: 404, message:"error while seeing if the current password resetting webhook is in use or not"})
                })
            }
            else return res.status(404).send({status: 404, message: `user not even registered (${email})`});
        }).catch((errr:any)=>{
            //this catch means theres no user attached with certain email, hence he/she can't reset the password
            console.log(errr)
            return res.status(404).send({status: 404, message: "error while checking if the user is connected with the email or not(pwd reset)"})
            
        })
    }
    catch(error){
        console.log("!serverWh-line 103!", error);
        return res.status(404).send({status: 404, message:'Internal server error /requestresetpassword'});
    }

})

router 

//remember this is a get request
router.get("/resetpw", (req:any, res:any, next:any)=>{
   try{
        if(!req.query.end) return res.status(404).send({status: 404, message:"unknown endpoint, was expecting endpoint with a query"});
        let decodedObject = crypt0.createDecipher('aes-128-cbc', decryptKey4pwdrst);
        let MydecodedParams = decodedObject.update(req.query.end, 'hex', 'utf8')
        MydecodedParams += decodedObject.final('utf8');

        //decoding unique url key into normal json format
        const q1 = JSON.parse(MydecodedParams);
        console.log(q1)
        pwdreset.findOneAndDelete({email: q1.email}).then((RESOLVE:any)=>{
            if(!RESOLVE){
                console.log("pwdreset already exists");
                return res.status(404).send({status:404, message:"password reset session has been ended"});
            }
            else{
                res.render("fp", {portal: req.query.end});
            }
            
        })
   }
   catch(error){
     console.log("!serverWh-line 128!", error);
     return res.status(404).send({status: 404, message:'Internal server error /resetpw'})
   }
})

//endpoint for changing password
router.post("/changepassword", async (req:any, res:any, next:any)=>{
    if(!req.body.currentPassword || !req.body.newPassword || !req.body.confirmNewPassword || !req.body.email) return res.status(404).send({status:404, message:"missing param(s) from the client side"});
        const {currentPassword, newPassword, confirmNewPassword, email} = req.body;
            try{
                //seachig if user exists or not
                User.findOne({email: email}).then((zol:any) => {

                    //confirm if user exists w/ basic if & else conditions
                    if(!zol) return res.status(404).send({status:404, message:"no user found with the specified email"});
                        if(newPassword != confirmNewPassword) return res.status(404).send({status:404, message:"confirm password is incorrect"});
                            bcrypt.compare(currentPassword, zol.password, (err:any, isMatch:any)=>{
                                if(err) return res.json({status:404, message: 'cannot match password'});
                                
                                //if hashed password in db and currentpassword matches
                                if(isMatch){
                                    bcrypt.genSalt(10, async (err:any, salt:any)=> 
                                        bcrypt.hash(newPassword, salt, (err:any, newHash:any)=> {
                                            if(err) return res.status(404).send({status: 202, message:"error generating hash from the server, mail us on nandan@dicot.in"});
                                            User.findOneAndUpdate({email: zol.email, password: newHash}).then((U:any) =>{
                                                if(U){
                                                    //+ve ultimate password-change endpoint
                                                    return res.status(200).send({status:200, message:"password has been changed successfully"});
                                                }
                                                else{
                                                    //-ve ultimate password-change endpoint
                                                    console.log("no user found, cannot change the password");
                                                    return res.status(404).send({status:404, message:"password cannot be changed!"});
                                                }
                                            }).catch((eRRor:any) =>{console.log("something went wrong while changing password")})
                                    }));
                                }
                                else return res.json({status: 404, message: "current password is incorrect!"});
                            })
                
                }).catch((error:any)=>{
                    console.log(error);
                    return res.status(404).send({status:404, message: JSON.stringify(error)});
                })
            }
            catch(error){
                console.log("!serverWh-line 172!", error)
                return res.status(404).send({status: 404, message:'Internal server error /changepassword'})
            }
});

//ultimate endpoint to change password(critical endpoint)
router.post("/resetpw", require("../service/passwordresetTimeout"), async (req:any, res:any, next:any)=>{
   try{
        if(!req.body.password || !req.body.confirmPassword || !req.body.portalToken) return res.status(404).send({status:404, message:"missing param(s) from the client side"});
        const {password, confirmPassword, portalToken} = req.body;

        if(password != confirmPassword) return res.status(403).send({status:403, message:"password mismatch, session also expired"});

        //decoding using decypher to get email and username
        let decodedObject = crypt0.createDecipher('aes-128-cbc', decryptKey4pwdrst);
        let MydecodedParams = decodedObject.update(portalToken, 'hex', 'utf8')
        MydecodedParams += decodedObject.final('utf8');

        //json parsening
        const q1 = JSON.parse(MydecodedParams);

        //searching for the user via email
        User.find({email:q1.email}).then((user:any) => {
            if(user){
                //double checking user's email and username before resetting the password.
                User.find({username:q1.token}).then((found:any)=>{
                    if(!found) return res.status(404).send({status: 404, message:"failed to get current username for password reset from the server"});

                    //resetting the password.
                    bcrypt.genSalt(10, async (err:any, salt:any)=> 
                        bcrypt.hash(confirmPassword, salt, (err:any, newHash:any)=> {
                            if(err) return res.status(404).send({status: 202, message:"error generating hash from the server, mail us on nandan@dicot.in"});
                            User.findOneAndUpdate({email: q1.email, password: newHash}).then((U:any) =>{
                                if(U){
                                    //+ve ultimate password-change endpoint
                                    return res.status(200).send({status:200, message:"password has been changed successfully"});
                                }
                                else{
                                    //-ve ultimate password-change endpoint
                                    console.log("no user found, cannot change the password");
                                    return res.status(404).send({status:404, message:"password cannot be changed!"});
                                }
                            }).catch((eRRor:any) =>{console.log("something went wrong while changing password")})
                    }));
                    
                })
            }
            else return res.status(404).send({status: 404, message:"failed to get current email for password reset from the server"})
        })
   }
   catch(error){
        console.log("!serverWh-line 199!", error)
        return res.status(404).send({status: 404, message:'Internal server error /resetpw(post)'})
   }

})

export {}
module.exports = router