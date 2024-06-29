const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Email = require('mongoose-type-email');

const userSchema = new Schema({
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
    position:{
        type:String,
    },
    grade:{
        type:String,
    },
    sex:{
      type:String,
    },
    image:{
      type:String,
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
