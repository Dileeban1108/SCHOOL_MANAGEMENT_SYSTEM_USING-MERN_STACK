const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Email = require('mongoose-type-email');

const timeLogSchema = new Schema({
    username: {
        type: String,
    },
    email: {
        type: Email,
        lowercase: true,
    },
    date:{
        type:Date,
    },
    status : {
        type:String,
    }
}, { timestamps: true });

module.exports = mongoose.model('TimeLog', timeLogSchema);
