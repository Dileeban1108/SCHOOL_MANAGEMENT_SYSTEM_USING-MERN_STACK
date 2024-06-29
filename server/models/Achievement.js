const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const achievementSchema = new Schema(
  {
    image: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Achievement', achievementSchema);
