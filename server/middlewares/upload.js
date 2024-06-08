// routes/upload.js
const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../client/public/uploads/')); // Adjust the path to point to your React frontend
  },
  filename: function (req, file, cb) {
    const name = Date.now() + '-' + file.originalname;
    cb(null, name);
  }
});
const upload = multer({ storage: storage });

router.post('/', upload.single('image'), (req, res) => {
  try {
    res.status(200).json({ filePath: `/uploads/${req.file.filename}` });
  } catch (err) {
    res.status(400).send('Error uploading file.');
  }
});

module.exports = router;
