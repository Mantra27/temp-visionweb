const router = require('express').Router();
const user = require("../models/user");
const crypt0 = require('crypto');
const nodemailer = require('nodemailer');
const {mailMan} = require('../utils/handler')

//--------------------------------------------------
const decryptKey = '' //secret key to decode email verification urls
//--------------------------------------------------

router.get("/verifyme", (req:any, res:any, next:any)=>{
    try{
        //uncooking the unique url
        let decodedValue = crypt0.createDecipher('aes-128-cbc', decryptKey);
        let MydecodedParams = decodedValue.update(req.query.end, 'hex', 'utf8')
        MydecodedParams += decodedValue.final('utf8');

        //responsing the client with ans from the decrypted url
        const q1 = JSON.parse(MydecodedParams);
        user.findOneAndUpdate({email: q1.email}, {isEmailVerified: true}).then((resolve:any)=>{
            if(resolve) return res.render("idle", {username: q1.email})
        })
    }
    catch(e){return res.status(404).send(`<h1>An Error occured, we're redirecting you to the homepage in 3 seconds. </h1><script>setTimeout(()=>{window.location.replace('http://localhost:8080/');}, 3000)</script>`);} 
});

router.post("/sendemailforverification", async (req:any, res:any, next:any)=>{

    //poster must have 2 parameters(req.body.email, req.body.user)
    if(req.body.email == undefined || req.body.user == undefined) return res.json({status: 404, message: "invalid email/username for email verification"});

    // 2(email, user) queries will be from user's endpoint
    const tothe = req.body.email;
    const user = req.body.user

    //cooking the unique url
    let mykey = crypt0.createCipher('aes-128-cbc', 'xmSJ@*431$#)Zo3');
    let mystr = mykey.update(`{"user": "${user}", "email":"${tothe}"}`, 'utf8', 'hex')
    mystr += mykey.final('hex');

    //sending the email with the unique url
    await mailMan(tothe, {subject: "Dicot Email Verification", body:`http://localhost:8080/wh/verifyme?end=${mystr}`}).then((resolve:any)=>{
        return res.status(200).send({resolve});
    }).catch((err:any)=>{
        return res.status(500).send(JSON.stringify(err))
    })

});

export {}
module.exports = router