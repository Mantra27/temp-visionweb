const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const metadataschema = mongoose.Schema({

        Project: {
            type: String,
        },

        _clientSidedProjectName:{
            type: String
        },

        Location: {
            type: String,
        },
        
        IsVerified: {
            type: Number,
        },

        isSuspended: {
            type: Boolean,
        },

        Description: {
            type: String,
        },

        accessToken:{
            type: String,
        }, 

        Project_id: {
            type: String,
        },

        Misc: [{

            Timed:{
                type: String,
            },

            Devices: [{
                Header: String,
                val: [{
                    type: Object,
                }]
            }]

        }],

    }
)

const entryschema = new Schema({

    user: {
        type: String,
        required: true
    },

    username:{
        type: String,
        required:true
    },

    VISON_C_TOKEN: {
        type: String
    }, 

    LastModified: {
        type: String,
        required: true
    },
    
    metadata: [metadataschema]

});

export {}
const Entry = mongoose.model("Entry", entryschema, "library");
module.exports = Entry;
