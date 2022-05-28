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
                                        if(err) return res.status(404).send({message:"error generating hash from the server, mail us on nandan@dicot.in"});
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

// router.post("/login", (req:any, res:any)=>{
//     console.log("trying to log in");
// });

export {}
module.exports = router;