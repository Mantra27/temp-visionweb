const mongoose = require('mongoose');
const UserSchema  = new mongoose.Schema({

    username :{
        type  : String,
        required : true
    },

    email :{
        type  : String,
        required : true
    },

    password :{
        type  : String,
        required : true
    },
    
    contactNumber: {
        type:String,
        required: true
    },
    
    country:{
        type: String, 
        required: true
    },
    
    date :{
        type : Date,
        default : Date.now
    },
    
    isEmailVerified:{
        type: Boolean,
        default: false,
        required: true
    }
});


const User = mongoose.model('User', UserSchema, "users");
export {}
module.exports = User;