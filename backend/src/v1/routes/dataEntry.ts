const router = require("express").Router();
const entry = require("../models/entry");
const path = require("path");
const jwt = require("jsonwebtoken");
const Entry = require("../models/entry");
const User = require("../models/user");

require('dotenv').config({path: path.resolve(__dirname + '/../.env')});
//-----------------------------------
const jwtKey = process.env.jwtkey;
const ConnectionT0kenKey = process.env.ConnectionT0kenKey; //secret key for
//-----------------------------------

router.get("/", (req:any, res:any, next:any)=>{
    return res.send("listening to the post requests on this endpoint");
});

router.post("/update-data", (req:any, res:any)=>{
    const {token = null, metadata = null} = req.body;
    if(!token || !metadata) return res.status(200).send({status:404, message:"a query(s) is missing from client, try checking your posting data with 2 params a TOKEN and A METADATA"})
})

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
router.post("/get-data", (req:any, res:any) => {
    const {token, user} = req.body; 
    //token will be unique uuidv4 graph id, user will be logged in user's token

    if(!token || !user) return res.status(200).send({status:404, message:'invalid token/user logo-on from the client'});

    jwt.verify(user, jwtKey, function(err:any, userData:any) {
        if(err) return res.status(200).send({status: 404, message: "error while decoding token(jwtkey)", error: JSON.stringify(err)});
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
            Entry.findOne({"metadata.accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJQcm9qZWN0IjoiZmlyc3QiLCJ1dWlkIjoiNTgyMGRjMjMtNzdjYi00Y2RlLWJiMTYtNTQ2MTA4NWI4NTZjIiwiaWF0IjoxNjYyMDEwNDcwfQ.BnTlnL5FROlABEHoJBFvGiL1bIC2qfL7VSa-YlS98HE"}).then((Resign:any) => {
                if(!Resign) return res.status(200).send({status:404, message:"something went wrong while searching graph-id"});
                if(Resign.username != requesterName) return res.status(200).send({status:404, message:"youre doing something fishy"});

                    const Payload = new Promise((PromiseResolve, PromiseReject ) => {
                        let boolean = false;
                        Resign.metadata.forEach((element:any, index:any) => {
                            if(element.Project_id == token){
                                boolean = true;
                                return PromiseResolve(element);
                            }
                        })
                        if(!boolean) return PromiseReject("cannnot find certain project with token");
                    })
                    Payload.then((er:any) => {
                        if(!er.IsVerified) return res.status(200).send({status:404, message:"current project aint verified(connected) to any active instense"});
                        return res.status(200).send({status:200, message:"success", _values: er.Misc})
                    }).catch((errr:any) => {
                        return res.status(200).send({status:404, message:errr})
                    })
            })
        }
        else return res.status(200).send({status:404, message: "got no error but something went wrong while decoding token"})
    });

});


export {}
module.exports = router
