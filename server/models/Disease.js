const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const diseaseSchema = new Schema({
    diseasename: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    symptoms: {
        type: String,
        required: true
    },
    treatment: {
        type: String,
        required:true
    },
}, { timestamps: true });

module.exports = mongoose.model('Disease', diseaseSchema);
