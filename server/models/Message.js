const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Email = require('mongoose-type-email');

const messageSchema = new Schema({
    recieverName: {
        type: String,
    },
    senderEmail: {
        type: Email,
        lowercase: true,
    },
    recieverEmail: {
        type: Email,
        lowercase: true,
    },
    message:{
        type:String
    },
    senderName:{
        type:String,
    },

}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
