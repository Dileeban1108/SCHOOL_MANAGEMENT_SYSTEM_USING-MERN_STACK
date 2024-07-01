const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    enrolNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    idNumber: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    enrolDate: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
