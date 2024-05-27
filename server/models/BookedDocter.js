const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Email = require('mongoose-type-email');

const bookedDoctorSchema = new Schema(
  {
    doctorname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: Email,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    regnumber: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BookedDoctor", bookedDoctorSchema);
