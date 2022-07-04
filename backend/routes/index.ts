const router = require('express').Router();

router.get("/", (req:any, res:any)=>{
    if(req.user){
        res.status(200).json({success:true, message:"successfull", user: req.user}); 
        //db callback...
    }
    else return res.status(404).json({success:false, message: "not logged in"})
});


export {};
module.exports = router