const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Email = require('mongoose-type-email');

const doctorSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: Email,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
    },
    address: {
        type: String,
    },
    regnumber:{
        type:String,
    },
    hospital:{
        type:String,
    },
    specialization:{
        type:String,
    }
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);
