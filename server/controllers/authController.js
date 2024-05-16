const Doctor = require("../models/Doctor");
const Shedule = require("../models/Shedule");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "email and passwords are required" });

  const foundUser = await Doctor.findOne({ email: email }).exec();
  if (!foundUser) return res.sendStatus(401); 
  const matchPassword = await bcrypt.compare(password, foundUser.password);
  console.log("bcrypt password:", matchPassword);
  if (matchPassword) {
    const accessToken = jwt.sign(
      {
        userInfo: { username: foundUser.username },
        issuedAt: Date.now(), // Include timestamp indicating when the token was issued
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "20s" }
    );

    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    console.log(result);

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true, 
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};




module.exports = { handleLogin};
