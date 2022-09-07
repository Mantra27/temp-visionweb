const Password = require('../models/pwdresetwh');
const decryptKey4pwdrst = "n@*#sn!)7z3920"; //secret key to decode password reset urls
const crypt0 = require('crypto');

const isPasswordResetURLAlive = (req:any, res:any, next:any)=> {
    try{
        if(!req.body.password || !req.body.confirmPassword || !req.body.portalToken) return res.status(404).send({status:404, message:"missing param(s) from the client side"});
        const {password, confirmPassword, portalToken} = req.body;
        if(password != confirmPassword) return res.status(403).send({status:403, message:"password mismatch, session also expired"});

        //decoding using decypher to get email and username
        let decodedObject = crypt0.createDecipher('aes-128-cbc', decryptKey4pwdrst);
        let MydecodedParams = decodedObject.update(portalToken, 'hex', 'utf8')
        MydecodedParams += decodedObject.final('utf8');

        //password reset
        //json parsening
        const q1 = JSON.parse(MydecodedParams);
        const timeDiff = Number(new Date().getTime()) - Number(q1.t);

        //checking if the current session isnt timed out(a session lasts 10 mins);
        if(timeDiff > 600000) return res.status(404).send({status:404, message:"password reset failed, reason for failure: requested url timedout"});
        else return next();
    }
    catch(error){
        console.log("!/middlewares/passwordresetTimeout -line 21!", error);
        return res.status(404).send({status: 404, message:'Internal server error -service/passwordresettimeout'})
    }
}
export {}
module.exports = isPasswordResetURLAlive