const router = require("express").Router();
const entry = require("../models/entry");

router.get("/", (req:any, res:any, next:any)=>{
    return res.send("listening to the post requests on this endpoint");
});

router.post("/", async (req:any, res:any, next:any)=>{
    
    let q1 = req.body.user;
    let q2 = req.body.metadata; //data would be in string form
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
                        console.log('user already exists');
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

    if(req.body.token != "OQ4fnLvQnjNEDJtxTBdasn38Puv26o92") return res.json({status: 404, message: "invalid/empty token"});
    entry.findOne({user: req.body.user}).then((resolve:any)=>{
        if(resolve) return res.json({status: 'ok', message: resolve});
        return res.json({status: 404, message: "no data found with certain username"});
    })
    
    
});

export {}
module.exports = router
