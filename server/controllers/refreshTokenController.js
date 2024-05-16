const User = require('../models/Doctor');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res, next) => {
  const refreshToken = req.cookies.jwt;

  // Check if the request contains a refresh token
  if (!refreshToken) {
    return res.sendStatus(401); // Unauthorized
  }

  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // Find the user associated with the refresh token
    const foundUser = await Doctor.findOne({ refreshToken }).exec();
    if (!foundUser || foundUser.username !== decoded.username) {
      return res.sendStatus(403); // Forbidden
    }

    // Generate a new access token
    const accessToken = jwt.sign(
      { userinfo: { username: decoded.username } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '30s' }
    );

    // Attach the new access token to the response object
    res.locals.accessToken = accessToken;

    // Call next to proceed to the next middleware
    next();
  } catch (error) {
    return res.sendStatus(403); // Forbidden
  }
};

const refreshTokenController = async (req, res) => {
  // Send the new access token in the response
  res.json({ accessToken: res.locals.accessToken });
};

module.exports =  {handleRefreshToken}
