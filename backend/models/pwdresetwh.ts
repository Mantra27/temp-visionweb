const mongoose = require('mongoose');
const PwdresetSchema  = new mongoose.Schema({

    email:{
        type  : String,
        required : true
    },
    
    t:{
        type : String,
        required : true
    },
    
    token:{
        type: String,
        required : true
    }, 
    
    ip:{
        type: String,
        required : true
    }
    
});


const Pwdreset = mongoose.model('pwdreset', PwdresetSchema, "pwdresetwh");
export {}
module.exports = Pwdreset;