const mongoose = require('mongoose');
const clientlogs  = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    email:{
        type: String,
        required : true
    },

    role: {
        type: String,
        required : true
    },

    logs:[
        {
            type: Object
        }
    ],
    
    lastknownip:{
        type: String,
        required : true,
        default: "0.0.0.0"
    }, 

    time:{
        type: String,
        required: true
    }
});

const logs = mongoose.model('clientlogs', clientlogs, "clientlogs");
export {}
module.exports = logs;