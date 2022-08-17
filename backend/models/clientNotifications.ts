const mongoose = require('mongoose');
const clientNotification  = new mongoose.Schema({

    email:{
        type: String,
        required : true
    },
    
    notifications:[
        {
            content: {type: String, required: true},
            dateInitiated: {type: String, required: false},
            seen: {type: Boolean, default: false},
            dateSeen: {type: String, required: false},
            seenBy: {type: String, required: false},
        }
    ],
    
});

const clientNoty = mongoose.model('clientNotifications', clientNotification, "clientNotifications");
export {}
module.exports = clientNoty;