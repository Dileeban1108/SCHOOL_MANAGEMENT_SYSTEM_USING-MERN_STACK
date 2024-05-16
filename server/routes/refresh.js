const express = require('express');
const router = express.Router();
const  refreshTokenController= require('../controllers/refreshTokenController');

// Route for handling token refresh
router.get('/',refreshTokenController.handleRefreshToken)

module.exports = router;
