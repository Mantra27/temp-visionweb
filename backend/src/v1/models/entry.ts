const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSettings = new Schema({
        
});

const metadataschema = mongoose.Schema({

        Project: {
            type: String,
        }, // vision-web sided project namr

        _clientSidedProjectName:{
            type: String
        }, //this name will be given by the client's side (vision-c, or anyother platform)

        Location: {
            type: String,
        }, //project location
        
        IsVerified: {
            type: Number,
            default: 0
        },

        isSuspended: {
            type: Boolean,
            default: false
        },

        isDeleted: {
            type: Boolean,
            default: false
        },

        Description: {
            type: String,
        }, //project description

        accessToken:{
            type: String,
        }, //token to access thi project from various devices

        Project_id: {
            type: String,
        }, //uuidv4 generated by server

        Settings: projectSettings,

        Misc: [{

            Timed:{
                type: String,
            },

            Devices: [{
                Header: String,
                val: [{
                    val: {
                        type: Object,
                        required: true
                    },
                    time:{
                        type: Object,
                        required: true
                    }
                }]
            }]

        }],

    }
)

const entryschema = new Schema({

    user: {
        type: String,
        required: true
    }, //email

    username:{
        type: String,
        required:true
    }, //username

    LastModified: {
        type: String,
        required: true
    }, //LastModified time in long int
    
    metadata: [metadataschema]

});


export {}
const Entry = mongoose.model("Entry", entryschema, "library");
module.exports = Entry;
