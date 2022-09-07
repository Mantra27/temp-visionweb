const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

    //api/stat (for machine learning [big-brain]) 
    router.post("/handover", async (req:any, res:any)=>{
        const {body, token = null} = req;
        //kaushikee's logger will be added here
        // if(!token || token != AiUserDataT0ken) return res.status(404).json({status: 404, message:"invalid token from admin"});
        const filename = uuidv4(); // '110ec58a-a0f2-4ac4-8393-c866d813b8d1'
        await fs.writeFileSync(`/Users/surge/Desktop/code/dicot/v2/backend/_dataBigBrain/${filename}.json`, JSON.stringify(body.body));
        return res.status(200).json({status: 200, message:`file created successfully with the name ${filename}`});
    });

    router.post("/takeover", (req:any, res:any)=>{
        //yet to be done, this endpoint will retrive the bigbrain data
    })

module.exports = router
export {}