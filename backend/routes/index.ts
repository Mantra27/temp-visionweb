const router = require('express').Router();

router.get("/", (req:any, res:any, next:any)=>{
    if(req.user) return res.status(200).json({user: req.user});
    return res.status(200).json({hello: "world"})
    
});

export {};
module.exports = router