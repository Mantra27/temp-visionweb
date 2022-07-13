const mongoose = require('mongoose');
const clientlogs  = new mongoose.Schema({

    email:{
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
    }
    
});

const logs = mongoose.model('clientlogs', clientlogs, "clientlogs");
export {}
module.exports = logs;