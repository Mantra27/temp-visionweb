const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PYTBV_SCHEMA = new Schema({

    email: {
        type: String,
    },

    username:{
        type: String,
        required:true
    },

    Project:{
        type: String,
        required: true
    },

    accessToken:{
        type: String,
        required: true
    },

    VISON_C_CLIENT:{
        type: String,
        required: true
    },

    uuid: {
        type: String,
        required: true
    }, 

    LastModified: {
        type: String,
        required: true
    },

});

export {}

// PYTBV = 'projects yet to be verified'
const PYTBV = mongoose.model("PYTBV", PYTBV_SCHEMA, "PYTBV");
module.exports = PYTBV;
