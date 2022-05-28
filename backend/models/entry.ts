const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const metadataschema = mongoose.Schema({

        Project: {
            type: String,
            required: true
        },

        Project_id: {
            type: String,
            required: true
        },

        Misc: {

            Timed:{
                type: String,
                required: true,
            },

            Devices: [{
                Header: String,
                val: {
                    type: String,
                    required: true
                }
            }]

        },

    }
)

const entryschema = new Schema({

    user: {
        type: String,
        required: true
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
