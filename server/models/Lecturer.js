const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Email = require('mongoose-type-email');

const lecturerSchema = new Schema({
    lecturename: {
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
    position:{
        type:String,
        required:true,
    },
    university:{
        type:String,
        required:true,
    }
}, { timestamps: true });

module.exports = mongoose.model('Lecture', lecturerSchema);
