const router = require('express').Router();

router.get("/", (req:any, res:any, next:any)=>{
    res.send("hello world");
});

export {};
module.exports = router