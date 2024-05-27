const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviweSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    rating:{
        type: Number,
        required: true 
    }
})
module.exports = mongoose.model('Review', reviweSchema);
