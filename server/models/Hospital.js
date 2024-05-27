const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hospitalSchema = new Schema({
    hospitalname: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
    },
    address: {
        type: String,
    }
}, { timestamps: true });

module.exports = mongoose.model('Hospital', hospitalSchema);
