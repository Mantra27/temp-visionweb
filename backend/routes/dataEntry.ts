const router = require("express").Router();
const entry = require("../models/entry");
const path = require("path");
const jwt = require("jsonwebtoken");
const Entry = require("../models/entry");
const User = require("../models/user");

require('dotenv').config({path: path.resolve(__dirname + '/../.env')});
//-----------------------------------
const jwtKey = process.env.jwtkey;
//-----------------------------------

router.get("/", (req:any, res:any, next:any)=>{
    return res.send("listening to the post requests on this endpoint");
});

router.post("/update-values", (req:any, res:any, next:any)=>{
    
});

//this endpoint will be be the most spammed in the server, [users will check values updation for their projects from here]
router.post("/get-values", (req:any, res:any, next:any)=>{
    const {token, projectId} = req.body;
    if(!token) return res.status(200).send({status:404, message:'invalid token from client\'s side'});
    jwt.verify(token, jwtKey, function(err:any, decoded:any) {
        if(err) return res.status(200).send({status:404, message:"error while decoding your jwt token", err:JSON.stringify(err)});
        if(decoded){
            User.findOne({username: decoded.username}).then((data:any) => {
                if(!data) return res.status(200).send({status:404, message:"error while getting data from server"});
                Entry.findOne({user: data.email}).then((Data:any) => {
                    if(!Data) return res.status(200).send({status:404, message:"logged into server the server, but failed to get data from server"});
                        Data.metadata.map((elver:any, key:number)=>{
                            if(elver.Project_id == projectId){
                                return res.status(200).send({status:200, data:Data.metadata[key], message:"Data was successfully retrieved from the server"})
                            }
                        })
                })
            })
        }
    });   
});

//ultimate endpoint for posting data to the server from visionWeb
router.post("/", async (req:any, res:any, next:any)=>{
    if(!req.body.user || !req.body.metadata || !req.body.token) return res.status(404).send({status: 404, message: "parameter(s) from the client side is missing."})

    let q1 = req.body.user;
    let q2 = req.body.metadata; //data would be in string form, will have to convert it into json object
    let q3 = req.body.token || undefined;
    
            try{
                q2 = JSON.parse(q2);
                let setentry = new entry({
                    user: q1,
                    LastModified: `${new Date().toDateString()}, ${new Date().toTimeString()}`,
                    metadata: q2
                });

                await entry.findOne({user: q1}).then(async (response:any)=>{

                    if(!response){
                       await setentry.save().then((results:any)=>{
                            console.log("data saved");
                            return res.send(results);
                        }).catch((err:any)=>{
                            res.json({status: 404, message: JSON.stringify(err.message)});
                            console.log("ERR>>>(./routes/dataEntry.js))", err);
                        })
                    }
                    
                    else{
                        console.log('User already exists');

                        //will have to apply a manual json varifier coz we can't verify this part of the code by mongoose
                        entry.findOneAndReplace({user: q1}, {
                            user: q1,
                            LastModified: `${new Date().toDateString()}, ${new Date().toTimeString()}`,
                            metadata: q2
                        })
                            .then((innerResolve:any)=>{
                            console.log(innerResolve);
                        });
                        
                        return res.json({status: 404, message: "user overwritten"})
                    }

                })

            }

            catch(err){
                console.log("internal server err", err)
                return res.send({status: 404, message: "internal server err"})
            }
            
    
});

router.post("/getdata", (req:any, res:any, next:any)=>{

    if(req.body.token != process.env.getDbEntriesToken) return res.json({status: 404, message: "invalid/empty token"});
    entry.findOne({user: req.body.user}).then((resolve:any)=>{
        if(resolve) return res.json({status: 'ok', message: resolve});
        return res.json({status: 404, message: "no data found with certain username"});
    })
    
    
});

export {}
module.exports = router
