const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
router.post("/login", authController.handleLogin);

module.exports = router;
