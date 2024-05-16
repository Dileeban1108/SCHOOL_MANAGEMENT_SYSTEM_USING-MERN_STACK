const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
    university: {
        type: String,
        required: true
    },
    faculty: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    lecturername: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    zoomlink: {
        type: String, // Changed to String to store URLs
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('Schedule', ScheduleSchema);
