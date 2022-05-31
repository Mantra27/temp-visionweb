const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require('bcrypt');

router.get("/", (req:any, res:any)=>{
    return res.send({status: 'ok', message: 'server is up and running!'})
});

router.post("/register", async (req:any, res:any)=>{
    const {username, email, password, country, contactNumber} = req.body;
    if(!username || !email || !password || !contactNumber || !country) return res.status(404).send({message: "any of the query is missing from the client's end."});
    
    await User.findOne({email : email}).exec(async (err2:any,user:any)=>{
        if(!user){
        	await User.findOne({username : username}).exec(async (err2:any,user2:any)=>{
        		if(!user2){
        			const setNewUser = new User({
                        username: username,
                        email: email,
                        password: password,
                        country: country,
                        contactNumber: contactNumber
                    });
                        bcrypt.genSalt(10, (err:any,salt:any)=> 
                                bcrypt.hash(setNewUser.password,salt, (err:any, hash:any)=> {
                                        if(err) return res.status(404).send({status: 202, message:"error generating hash from the server, mail us on nandan@dicot.in"});
                                        setNewUser.password = hash;
                                        setNewUser.save()
                                        .then((value:any)=>{
                                            console.log('user succesfully registered');
                                            return res.json({status: 'ok', message:'user registered'})
                                        })
                                        .catch((value:any) => console.log(value));
                        }));
        		}
        		else{
        			console.log("user already exists(same username)");
                    return res.status(404).send({message: "user already exists(same username)"})
        		}
    		});
    
        }
        else{
        	console.log("user already exists(same email)");
            return res.status(404).send({message: "user already exists(same email)"})
        }
    });
});

router.post("/login", async (req:any, res:any)=>{
    const {email, password} = req.body;
    if(!email && !password) return res.status(202).send({status: 202, message:"username or password is in invalid format from the client's end"});
    await User.findOne({email : email}).exec(async (err:any, user:any)=>{
        
    })
    console.log("trying to log in");
});

router.post("/fp", async (req:any, res:any, next:any)=>{
    const {email} = req.body;
    console.log(req.body)
    res.send("hello")
})

//forgot-username....
// router.post("/fu", async (req:any, res:any, next:any)=>{
    
// })

export {}
module.exports = router;