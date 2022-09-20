const router = require('express').Router();
const { mailMan } = require('../utils/handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const fileUpload = require('express-fileupload');
const User = require("../models/user");
const Entry = require("../models/entry");
const crypt0 = require('crypto');
const pwdreset = require('../models/pwdresetwh');
const ProjectVerify = require('../models/PVerification');
const Logs = require('../models/clientLogs');
require('dotenv').config({path: path.resolve(__dirname + '/../.env')});

//--------------------------------------------------------------------------------------------------------
const decryptKey4ev = process.env.decryptKey4ev; //secret key to decode email verification urls
const decryptKey4pwdrst = process.env.decryptKey4pwdrst; //secret key to decode password reset urls
const ConnectionT0kenKey = process.env.ConnectionT0kenKey; //secret key for
// const AiUserDataT0ken = process.env.AiUserDataT0ken; //secret key for storing data for ai model
const jwtKey = process.env.jwtkey; //secret key for all jwt token validation
//--------------------------------------------------------------------------------------------------------

router.use(fileUpload());
//endpoint to connect vision-web with vision-c

//this endpoint is used to connect vision c to vision web(will return username in res)
router.post("/create-connection", async (req:any, res:any) => {
    const {token} = req.body;
    ProjectVerify.findOne({uuid: token}, (err:any, resolver:any)=>{
        if(err) return res.status(200).send({status: 404, message: 'something went wrong while checking for uuid in db', err: JSON.stringify(err)});
        //no verify request existed in db
        if(!resolver) return res.status(200).send({status: 404, message:"no project found with an active verify request, this occurs when project is already been verified or else project never did exist"});
        //this this point, if the instance is still alive, it means a verify request is already existed in db.
        const newAccessToken = resolver.accessToken;

        const FindProject_UUID = new Promise((aAR:any, bBJ:any)=>{
            Entry.findOne({"metadata.Project_id": resolver.uuid}).then((e:any)=>{

                    e.metadata.map((VALUE:any, KEY:any)=>{
                        if(VALUE.Project_id == token){
                            VALUE.IsVerified = 1;
                            return aAR({success: true, data: VALUE});
                        }
                    });

                e.save();
                return bBJ({success: false, data:"no data found with assigned uuid"});
            })
            
        });

            FindProject_UUID.then((fetched:any)=>{
                ProjectVerify.findOneAndDelete({uuid: token}, (solve:any) => {
                    return res.status(200).send({status: 200, message: "success", token: newAccessToken})
                });
            })
                .catch((notFetched:any)=>{
                    console.log(notFetched);
                    return res.status(200).send({status: 404, message:JSON.stringify(notFetched)})
                });
                
    });

    //also regenerate token from here
    // jwt.verify(token, ConnectionT0kenKey, function(err:any, decoded:any) {
    //     if(err) return res.status(200).send({status: 404, success: false, err: JSON.stringify(err)});
    //     if(decoded) return res.status(200).send({status: 200, success:true, username: decoded.username, modejwtdata: decoded.mode});
    //     else return res.status(200).send({status: 200, success:false});
    // })
});

// router.post("/update-data", (req:any, res:any) => {
//     console.log("trying to update data");
//     let {token, metadata} = req.body;
//     metadata = JSON.parse(metadata);
//     if(!token || !metadata) { return res.status(200).send({status: 404, message:"something is missing from client's end"})};
//         jwt.verify(token, ConnectionT0kenKey, function(err:any, decoded:any){
//             if(!decoded) return res.status(200).send({status:404, message: "error while verifying token"})
//             Entry.findOne({user: decoded.email}).then((entry:any) => {
//                 if(err) return res.status(200).send({status: 404, success: false, err: JSON.stringify(err)});
//                 if(decoded){
//                     //user is updating the data for the first time, so we'll have to create a new entry
//                     if(!entry){

//                         const DraftEntry = new Entry({
//                             accessToken: token,
//                             user: decoded.email,
//                             username: decoded.username,
//                             metadata: metadata, 
//                             LastModified: new Date().getTime()
//                         });
//                         DraftEntry.save();
//                         return res.status(200).json({status: 200, success: true, message:"this is your first time updating data, so we did make a new library for you"})

//                     }

//                     //user aint updating his/her data for the first time, he/she already tried to do so
//                     else{

//                         // this codes supporting single project only, since its metadata[0], first project's value will be replaced always
//                         // replace.metadata[0].Misc = metadata[0]

//                         // const mergeArrays = (Older:any, New:any) => {
//                         //     console.log("Older", Older, "new", New);
//                         //     let temp = [0];
//                         //     Older.map((VALUEE:any, KEYY:any) => {
//                         //         temp[KEYY] = VALUEE;
//                         //     });
//                         //     New.map((ZALLUE:any, ZEYY:any) =>{
//                         //         temp[temp.length] = ZALLUE;
//                         //     })
//                         //     return temp;
//                         // };
                        
//                         // const addMemberToArray = (Older:any, New:any) => {
//                         //     Older[Older.length] = New;
//                         // };

//                         Entry.findOne({user:decoded.email}).then((replace:any) => {
//                             //theres new value in the input
                            
//                             let flag = false;
//                             replace.metadata[0].Misc.forEach((val:any, key:any)=>{
//                                 val.Devices.forEach((VAL:any, key:any)=>{
//                                     // if(VAL.Header == val.Header && VAL.val == val.val){ flag = true;}
//                                     metadata[0].Misc.Devices.forEach((VALL:any, KEYY:any)=>{
//                                         if(VAL.Header ==  VALL.Header && VAL.val == VALL.val){flag = true;}
//                                     })
//                                 })
//                             })

//                             if(!flag){
//                                 let newMetadata = {
//                                     Project: replace.metadata[0].Project,
//                                     Project_id: replace.metadata[0].Project_id,
//                                     Misc:[...replace.metadata[0].Misc, metadata[0].Misc]
//                                 }
    
//                                 Entry.updateOne({username: decoded.username}, {$set: {"metadata":newMetadata}}).then((resulT:any) => {
//                                     console.log(resulT);
//                                     return res.status(200).send({status:200, message:"values are added successfully", success: true})
//                                 })
//                             }
//                             else{
//                                 console.log("already value exists")
//                                 return res.status(200).send({status:404, message: "value already exists, no adding in the values"})
//                             }
//                         });
//                     }
//                 }
//                 else return res.status(200).send({status: 200, success:false, message:"something went wrong(user missing from db)"});
//             })
           
//         })

// });

//used to fetch data from client's frontend on refresh or login
router.post("/get-user-info", (req:any, res:any) => {
    const {token} = req.body;
    if(!token) return res.status(200).send({status:404, message:'invalid /get-user-info token from the client'});

    jwt.verify(token, jwtKey, function(err:any, decoded:any) {
        if(err) return res.status(200).send({status:404, message:"error while decoding your jwt token", err:JSON.stringify(err)});
        if(decoded){
            User.findOne({username: decoded.username}).then((data:any) => {
                return res.status(200).send({status:200, message: "data received", data:data});
            })
        }
    });   
});

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
            });
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
                        await mailMan(email, {subject: "@Dicot Password Reset", body:`http://localhost:8080/api/resetpw?end=${mystr}`}).then((RESOLVE:any)=>{
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

//remember this is a GET request
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

//endpoint for changing password not (resetting it)
router.post("/changepassword", async (req:any, res:any, next:any)=>{
    if(!req.body.currentPassword || !req.body.newPassword || !req.body.confirmNewPassword || !req.body.email) return res.status(404).send({status:404, message:"missing param(s) from the client side"});
        const {currentPassword, newPassword, confirmNewPassword, email} = req.body;
            try{
                //seachingif user exists or not
                User.findOne({email: email}).then((zol:any) => {
                    //confirm if user exists w/ basic if & else conditions
                    if(!zol) return res.status(404).send({status:404, message:"no user found with the specified email"});
                        if(newPassword != confirmNewPassword) return res.status(404).send({status:404, message:"confirm password is incorrect"});
                            bcrypt.compare(currentPassword, zol.password, (err:any, isMatch:any)=>{
                                if(err) return res.json({status:404, message: 'cannot match current password'});
                                
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
                //!logger here
                console.log("!serverWh-line 172!", error)
                return res.status(404).send({status: 404, message:'Internal server error /changepassword'})
            }
});

//ultimate endpoint to change password(critical endpoint)
router.post("/resetpw", require("../middlewares/passwordresetTimeout"), async (req:any, res:any, next:any)=>{
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

});

router.post("/addrole", (req:any, res:any)=>{
    //confirm password before this role addition

    const{sendermail, email, role} = req.body;
    try{
        User.findone({email: sendermail}).then((checkSendersRole:any)=>{
            //cheking if the sender is atleast admin/owner
            if(checkSendersRole.role != "admin" || checkSendersRole.role != "owner") return res.status(200).send({status:404, message:"you can not assign a role to a user, you're not eligible"});

            User.findOne({ email: email }).then((result:any)=>{
                if(!result) return res.status(200).send({status: 404, message:`this user ${email}, will have to register first before giving them a role!`});
                const possibleRoles = ['owner', 'admin', 'manager', 'worker'];

                //could be useless
                if(
                    possibleRoles.map((E:any)=>{
                    if(role == E){return true;}
                    return false;
                    })
                ) return res.status(200).send({status: 404, message:"client selected invalid role"});

                //after setting the role, we'll also give him access to projects
                result.role = role;
                Entry.findOne({email:email}).then((entryResult:any) => {
                    if(!entryResult) return res.status(200).send({status: 404, message:"an error occurred while getting client's current project while giving him a role"})
                    Entry.findone({email:sendermail}).then((entryResultFromAdmin:any) => {
                        if(!entryResultFromAdmin) return res.status(200).send({status:404, message:"an error occurred while setting client's project from owner"})
                        entryResult = entryResultFromAdmin;
                    })
                });
                return res.status(200).send({status: 200, message:"role has been added successfully"})
            });
        })
    }
    catch(ERRR){
        return res.status(200).send({status:404, message:"server error while adding role", error: JSON.stringify(ERRR)})
    }
});

//when a user adds a new project to the dashboard
router.post("/addproject",(req:any, res:any) => {
    const {token, projects} = req.body;

    //side case handeling
    if(!token) return res.status(200).send({status:404, message:'invalid /addproject token from the client'});
    if(!projects[0].projectName || !projects[0].location || !projects[0].desc) return res.status(200).send({status:404, message:'invalid project property called from the client'});

    //verifying to user's jwt token before he/she can access someone's projects and stuff
    jwt.verify(token, jwtKey, function(err:any, decoded:any) {

        if(err) return res.status(200).send({status:404, message:"error while decoding your jwt token", err:JSON.stringify(err)});
        if(decoded){
            Entry.findOne({username: decoded.username}).then((Z:any) => {
                if(!Z){
                    //user never created a project before, its his/her first
                    User.findOne({username: decoded.username}).then((draftusername:any) => {
                        let email = draftusername.email ?? 'notfound';

                        const university = uuidv4();
                        const accessTOKEN = jwt.sign({Project: projects[0].projectName, uuid: university }, ConnectionT0kenKey);
                        Entry({
                            user: email,
                            username: decoded.username,
                            LastModified: new Date().getTime(),
                            metadata:[
                                {
                                    Project: projects[0].projectName,
                                    Project_id: university,
                                    accessToken: accessTOKEN,
                                    Description: projects[0].desc,
                                    Location: projects[0].location,
                                    IsVerified: 0,
                                    Misc:{}
                                }
                            ]
                        }).save();

                        const DraftProjectVerification = ProjectVerify({
                            Project: projects[0].projectName,
                            Project_id: university,
                            username: decoded.username,
                            email: email,
                            accessToken: accessTOKEN,
                            uuid: university,
                            LastModified: String(new Date().getTime())
                        });

                        DraftProjectVerification.save();
                        return res.status(200).send({status:200, message:"new project created successfully", uuid: university})
                    });
                }

                else{
                    const university = uuidv4();
                    const accessTOKEN = jwt.sign({Project: projects[0].projectName, uuid: university }, ConnectionT0kenKey);

                    Entry.updateOne({username: decoded.username}, {$push: {"metadata":
                            {
                                Project: projects[0].projectName,
                                Project_id: university,
                                accessToken: accessTOKEN,
                                Description: projects[0].desc,
                                IsVerified: 0,
                                Location: projects[0].location,
                                Misc:{}
                            }
                        }
                    })
                    .then((results:any)=>{
                        if(!results.acknowledged) return res.status(200).send({status:404, message:"coulnd add new project"});
                        const DraftProjectVerification = ProjectVerify({
                            Project: projects[0].projectName,
                            Project_id: university,
                            username: decoded.username,
                            accessToken: accessTOKEN,
                            uuid: university,
                            LastModified: String(new Date().getTime())
                        });

                        DraftProjectVerification.save();
                        return res.status(200).send({status:200, message:"new project created successfully", uuid:university})
                    })
                }

            });
        }
    });
});


router.post("/getprojects", (req:any, res:any)=>{
    const {token} = req.body;
    if(!token) return res.status(200).send({status:404, message:'invalid /addproject token from the client'});
    jwt.verify(token, jwtKey, function(err:any, decoded:any) {

        if(err) return res.status(200).send({status:404, message:"error while decoding your jwt token", err:JSON.stringify(err)});
        if(decoded){
            Entry.findOne({username: decoded.username}).then((z:any) => {
                if(!z) return res.status(200).send({status:200, message:"user_has_no_projects"});
                else{
                    return res.status(200).send({status:200, message:z});
                }
            });
        }
    });    
});

router.post("/save-settings", require("../middlewares/apiTokenVerifier"), (req:any, res:any)=>{
    //token will be verified in the middleware
    //new body will be returned

    const {body = null, graphId = null} = req.body;
    if(!body || !graphId) return res.status(200).send({status: 404, message: "something went wrong while working with body || graphId from client's side"});

});

router.post("/get-settings", require("../middlewares/apiTokenVerifier"), (req:any, res:any)=>{
    const {body} = req.body;

    const FindProject_UUID = new Promise((aAR:any, bBJ:any)=>{
        Entry.findOne({"metadata.Project_id": body.Project_id}).then((e:any)=>{

            e.metadata.map((VALUE:any, KEY:any)=>{
                if(VALUE.Project_id == req.body.graphId){
                    VALUE.IsVerified = 1;
                    return aAR({success: true, data: VALUE});
                }
            });
        })
    });

        FindProject_UUID.then((fetched:any)=>{
            console.log({fetched})
        }).catch((CATCH:any)=>{
            console.log({CATCH})
        })
});

router.post("/logs", (req:any, res:any) => {
    const {username, email, role, project, details, ip} = req.body;
    const Time = new Date().getTime();
    
    const DraftLog = new Logs({
        username: username,
        email: email,
        role: role,
        logs: details,
        lastknownip: ip,
        time: Time,
    });

    DraftLog.save().then((saving:any) => {
        return res.status(200).send({status:200, message:"log saved successfully"})
    })
    
});

router.post("/feedback", async (req:any, res:any)=>{

    console.log(req.files)
    if(!req.files) return res.send(`no files received from the user!`)

    console.time("uploaded");
    let sampleFile:any;
    sampleFile = await req.files.foo;
    console.log(sampleFile);
    await fs.writeFileSync(`../temp/${sampleFile.name}`, sampleFile.data);
    console.timeEnd('uploaded');

    //--> dear developer, this all mess was created to download file from user from react(axios) and upload it to server and send it back to the admins(via mails)

    let {name, email, subject, contact, feedback, attachedFile = null} = req.body;
    if(name.trim() == '' || email.trim() == '' || subject.trim() == '' || contact.trim() == ''  || feedback.trim() == '' ) return res.status(200).send({status: 404, message:"something is missing from input fields"});
    let filename = uuidv4(); 


    // console.log(req.files)
    // if(req.files){
    //     console.log("tehres a file!!")
    //     let sampleFile:any;
    //     sampleFile = await req.files.proof;
    //     console.log(sampleFile);
    //     await fs.writeFileSync(`../temp/${filename}_${sampleFile.name}`, sampleFile.data);
    //     filename = `${filename}_${sampleFile.name}`;
    //     attachedFile = 1;
    // }
    // if(attachedFile != 1){
    //     filename = null;
    // };

    //send mail to dicot admins(feedback)
    const adminMails = ["gohilmantra@gmail.com", "mantra@dicot.tech"];
    await adminMails.map(async (admins:any)=>{
        await mailMan(admins, {subject:`Recieved new feeback!`, body:`name: ${name}\n from: ${email} \n subject: ${subject} \n ${contact} \n attachments:${attachedFile} \n Feedback:${feedback}`, attachments:{filename:filename, content: fs.createReadStream(path.join(__dirname,`/${filename}`))}});
        console.log(`feedback sent to ${admins} successfully`)
    });
    return res.status(200).send({status: 200, message:"notified admins!"});
    
})

export {}
module.exports = router