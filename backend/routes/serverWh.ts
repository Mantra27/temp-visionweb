const router = require('express').Router();
const User = require("../models/user");
const crypt0 = require('crypto');
const nodemailer = require('nodemailer');
const {mailMan} = require('../utils/handler')
const pwdreset = require('../models/pwdresetwh');
require('dotenv').config();

//--------------------------------------------------
const decryptKey4ev = 'xmSJ@*431$#)Zo3'; //secret key to decode email verification urls
const decryptKey4pwdrst = 'n@*#sn!)7z3920'; //secret key to decode password reset urls
//--------------------------------------------------

router.get("/verifyme", (req:any, res:any, next:any)=>{
    try{
        //uncooking the unique url
        let decodedValue = crypt0.createDecipher('aes-128-cbc', decryptKey4ev);
        let MydecodedParams = decodedValue.update(req.query.end, 'hex', 'utf8')
        MydecodedParams += decodedValue.final('utf8');

        //responsing the client with ans from the decrypted url
        const q1 = JSON.parse(MydecodedParams);
        User.findOneAndUpdate({email: q1.email}, {isEmailVerified: true}).then((resolve:any)=>{
            if(resolve) return res.render("idle", {username: q1.email})
        })
    }
    catch(e){return res.status(404).send(`<h1>An Error occured, we're redirecting you to the homepage in 3 seconds. </h1><script>setTimeout(()=>{window.location.replace('http://localhost:8080/');}, 3000)</script>`);} 
});

router.post("/sendemailforverification", async (req:any, res:any, next:any)=>{

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
        await mailMan(tothe, {subject: "Dicot Email Verification", body:`http://localhost:8080/wh/verifyme?end=${mystr}`}).then((resolve:any)=>{
            return res.status(200).send({resolve});
        }).catch((err:any)=>{
            return res.status(500).send(JSON.stringify(err))
        })

    })
    

});

//-> /fp route is to request password reset
router.post("/fp", async (req:any, res:any, next:any)=>{
    const {email, IP = "0.0.0.0"} = req.body;
    
    //cooking the unique url
    User.findOne({email: email}).then((resolve:any)=>{
        if(resolve){
            pwdreset.findOne({email: email}).then(async (Resolve:any)=>{
                if(Resolve) return res.status(200).send({status: 202, message:"user already resetting his password"});
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
                            return res.status(202).send({status: 202, message: {respolve: resolve, message: "email also sent"}})
                        });
                     })
                     
                }
     
            }).catch(()=>{
                 return res.status(404).send({status: 404, message:"error while seeing if the current password resetting webhook is in use or not"})
            })
        }
        else return res.status(404).send({status: 404, message: "theres already a pending password reset with this email"})
    }).catch((errr:any)=>{
        //this catch means theres no user attached with certain email, hence he/she can't reset the password
        console.log(errr)
        return res.status(404).send({status: 404, message: "error while checking if the user is connected with the email or not(pwd reset)"})
        
    })

})


//remeber this is a get request
router.get("/resetpw", (req:any, res:any, next:any)=>{
    return res.render("fp", {portal: req.query.end});

    // //this will send the actual data to the servers

    // //uncooking the unique url
    // let decodedObject = crypt0.createDecipher('aes-128-cbc', decryptKey4pwdrst);
    // let MydecodedParams = decodedObject.update(req.query.end, 'hex', 'utf8')
    // MydecodedParams += decodedObject.final('utf8');

    // //responsing the client with ans from the decrypted url
    // const q1 = JSON.parse(MydecodedParams);
    // console.log("json:", q1);

})

export {}
module.exports = router