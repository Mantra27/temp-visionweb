const router = require("express").Router();
const entry = require("../models/entry");
const path = require("path");
const jwt = require("jsonwebtoken");
const Entry = require("../models/entry");
const User = require("../models/user");
const mongoose = require("mongoose")
require('dotenv').config({path: path.resolve(__dirname + '/../.env')});

//-----------------------------------
const jwtKey = process.env.jwtkey;
const ConnectionT0kenKey = process.env.ConnectionT0kenKey; //secret key for
//-----------------------------------

router.get("/", (req:any, res:any, next:any)=>{
    return res.send("listening to the post requests on this endpoint");
});

//this component will be called by the Vison-C/ other clients to update to DB

// router.post("/update-data", (req:any, res:any)=>{
//     console.log(req.body)
//     return res.status(200).send("ok");
// });

router.post("/tud", (req:any, res:any, next:any)=>{
    let {metadata} = req.body;
});

router.post("/update-data", (req:any, res:any)=>{
    let {token = null, metadata = null} = req.body;
    if(!metadata || !token) return res.status(200).send({status:404, message:"a query(s) is missing from client, try checking your posting data with 2 params a TOKEN and A METADATA"})
    metadata = JSON.parse(metadata)
    Entry.findOne({"metadata.accessToken": token}).then((found:any) => {
        
        if(!found) return res.status(200).send({status:404, message:"no active instance found with mentioned token"});
        const onMatch = new Promise((onResolve, onReject)=>{
            found.metadata.map((value:any, key:Number)=>{
                if(value.accessToken == token) return onResolve(value);
            });
            onReject({message:"no active instance found with current accessToken"});
        })

        onMatch.then((promiseData:any)=>{
            //project gets a match,

            let newDataFromClient = metadata[0].Misc.Devices; //array of devices from api req
            let newEntryTime = new Date().getTime();


            //first entry
            if(promiseData.Misc[0].Devices.length == 0){

                newDataFromClient.map(async (value:any, key:any)=>{
                    promiseData.Misc[0].Devices[key] = {Header: value.Header, val:{val:value.val, time: newEntryTime}}
                });

                found.save();
            }

            else{

                newDataFromClient.map(async (value:any, key:any)=>{
                    value.val = parseInt(value.val);
                    promiseData.Misc[0].Devices[key].val.push({Header: value.Header, val:{val:value.val, time: newEntryTime}})
                });

                newDataFromClient.map(async (value:any, key:any)=>{
                    let shouldIncludeIt = true;
                    promiseData.Misc[0].Devices.map((V:any, K:any)=>{
                        if(value.Header == V.Header){
                            shouldIncludeIt = false;
                        }
                    })

                    if(shouldIncludeIt){    
                        promiseData.Misc[0].Devices[ promiseData.Misc[0].Devices.length] = await {Header: value.Header, time: newEntryTime, val: {val: 2, time: newEntryTime}}
                        
                    }
                });
                found.save()
            }

            return res.send("ok");

        }).catch((E:any)=>{
            return res.status(200).send({status: 404, message:E});
        })
    })
});

router.post("/invite-members", require("../middlewares/apiTokenVerifier"), (req:any, res:any)=>{
    const {body} = req.body;
    const {email, project_id} = body;

});

//this endpoint will be be the most spammed in the server, [users will check values updation for their projects from here]
// router.post("/get-values", (req:any, res:any, next:any)=>{
//     const {token, projectId} = req.body;
//     if(!token) return res.status(200).send({status:404, message:'invalid token from client\'s side'});
//     jwt.verify(token, jwtKey, function(err:any, decoded:any) {
//         if(err) return res.status(200).send({status:404, message:"error while decoding your jwt token", err:JSON.stringify(err)});
//         if(decoded){
//             User.findOne({username: decoded.username}).then((data:any) => {
//                 if(!data) return res.status(200).send({status:404, message:"error while getting data from server"});
//                 Entry.findOne({user: data.email}).then((Data:any) => {
//                     if(!Data) return res.status(200).send({status:404, message:"logged into server the server, but failed to get data from server"});
//                         Data.metadata.map((elver:any, key:number)=>{
//                             if(elver.Project_id == projectId){
//                                 return res.status(200).send({status:200, data:Data.metadata[key], message:"Data was successfully retrieved from the server"})
//                             }
//                         })
//                 })
//             })
//         }
//     });   
// });


//this endpoint will be responsible for fetching data from the server using clients token to update the chart component
router.post("/get-data", require("../middlewares/apiTokenVerifier"), (req:any, res:any) => {

    //token will be unique uuidv4 graph id, secret will be logged in user's token from middleware
    //actually token will also be required to middleware(apiTOkenVerifier)

    const {body, secret} = req.body,
    token = body.token;
    const userData = secret;
    if(!token) return res.status(200).send({status:404, message:'invalid or null token w/ client'});
        if(userData){

            // {
            //     userData: {
            //       ip: '0.0.0.0',
            //       expires: null,
            //       username: 'Nandan S.',
            //       iat: 1662123124
            //     }
            //   }

            const requesterName = userData.username;
            Entry.findOne({"metadata.Project_id": token}).then((Resign:any) => {
                if(!Resign) return res.status(200).send({status:404, message:"invalid/null/undefined graph-id, please contact the administrator ()", _requester: userData});
                if(Resign.username != requesterName) return res.status(200).send({status:404, message:"something went wrong [code: de066]"});

                    const Payload = new Promise((PromiseResolve, PromiseReject) => {
                        let boolean = false;
                        Resign.metadata.forEach((element:any, index:any) => {
                            if(element.Project_id == token){
                                boolean = true;
                                return PromiseResolve(element);
                            }
                        })
                        if(!boolean) return PromiseReject("cannnot find certain project with token");
                    });

                    Payload.then((er:any) => {
                        if(!er.IsVerified) return res.status(200).send({status:404, message:"current project aint verified(connected) to any active instance"});
                        return res.status(200).send({status:200, message:"success", _values: er.Misc})
                    }).catch((errr:any) => {
                        return res.status(200).send({status:404, message:errr})
                    })
            })
        }
        else return res.status(200).send({status:404, message: "got no error but something went wrong while decoding token"})

});


export {}
module.exports = router
