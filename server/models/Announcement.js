const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const announcementSchema = new Schema(
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

module.exports = mongoose.model('Announcement', announcementSchema);
