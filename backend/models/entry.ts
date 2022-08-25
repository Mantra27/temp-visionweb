const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const metadataschema = mongoose.Schema({

        Project: {
            type: String,
        },

        Location: {
            type: String,
        },
        
        Description: {
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
                val: {
                    type: String,
                }
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

    accessToken: {
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
