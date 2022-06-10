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
    
    timeCreated :{
        type : Date,
        default : Date.now
    },
    
    isEmailVerified:{
        type: Boolean,
        default: false,
        required: true
    },

    avatar: {
        type: String,
        default: null
    },

    products: {
        type: Array,
        default: [Object(null)]
    },

    lastKnownLoginMethod: {
        type: String,
        default: null
    },

    lastLoginTime: {
        type: String,
        default: null
    },

    lastLoggedInIp:{
        type: String,
        default: null
    }

});


const User = mongoose.model('Users', UserSchema, "users");
export {}
module.exports = User;