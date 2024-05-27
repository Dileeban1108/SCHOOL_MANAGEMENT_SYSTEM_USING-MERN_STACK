const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const healthTipSchema = new Schema({
    healthtipname: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('HealthTip', healthTipSchema);
