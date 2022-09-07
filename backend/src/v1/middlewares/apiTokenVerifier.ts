const jwt = require('jsonwebtoken');
require('dotenv');
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname + '/../../../.env')});

// -------------------------------------------
const jwtKey = process.env.jwtkey //secret key to decode client(token)
//-------------------------------------------

module.exports = async (req:any, res:any, next:any)=>{
    const {secret = null} = req.body;
    if(!secret) return res.status(200).send({status:404, message:"token missing from the clients side"});
        jwt.verify(secret, jwtKey, (err:any, success:any)=>{
            if(err) return res.status(200).send({status:500, message:"unable to verify token from client"});
            req.body = success;
            next();
        })
}
export{}