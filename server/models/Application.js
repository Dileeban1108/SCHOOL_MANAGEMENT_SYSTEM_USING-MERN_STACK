const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const applicationSchema = new Schema(
  {
    deadLine: {
      type: Date,
    },
    file: {
      type: String,
    },
    type:{
        type:String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Application', applicationSchema);
