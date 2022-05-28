const router = require('express').Router();
const user = require("../models/user");
var crypt0 = require('crypto');
const nodemailer = require('nodemailer');

//--------------------------------------------------
const decryptKey = 'xmSJ@*431$#)Zo3'
const senderMail = "mantragohil1@gmail.com";
const senderPass = "9898517325";
//--------------------------------------------------

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: senderMail,
        pass: senderPass
    }
});

router.get("/verifyme", (req:any, res:any, next:any)=>{
    console.log('query is: ', req.query);

    let decodedValue = crypt0.createDecipher('aes-128-cbc', decryptKey);
    let MydecodedParams = decodedValue.update(req.query.end, 'hex', 'utf8')
    MydecodedParams += decodedValue.final('utf8');

    const q1 = JSON.parse(MydecodedParams);
    user.findOneAndUpdate({email: q1.email}, {isEmailVerified: true}).then((resolve:any)=>{
        if(resolve){
            return res.render("emailVerification")
        }
    })
    

});

router.post("/sendemailforverification", (req:any, res:any, next:any)=>{
    if(req.body.email == undefined || req.body.user == undefined) return res.json({status: 404, message: "invalid email/username for email verification"});

    // 2(email, user) queries will be from user's endpoint
    const tothe = req.body.email;
    const user = req.body.user

    let mykey = crypt0.createCipher('aes-128-cbc', 'xmSJ@*431$#)Zo3');
    let mystr = mykey.update(`{"user": "${user}", "email":"${tothe}"}`, 'utf8', 'hex')
    mystr += mykey.final('hex');

    let mailOptions = {

        from: senderMail,
        to: tothe,
        subject: 'Dicot© Sign-up',
        html: `http://localhost:3000/wh/verifyme?end=${mystr}`

    };
    
    transporter.sendMail(mailOptions, (error:any, info:any) => {

        if (error) {
            return console.log(error.message);
        }
        console.log('success, otp has been sent.');
        return res.send({status: 'ok', message: "otp has been sent"})


    });
    
});

export {}
module.exports = router