const Doctor=require('../models/Doctor')
const bcrypt = require("bcrypt");

const handleNewDoctor = async (req, res) => {
  const {username,email, password,phone,address,regnumber} = req.body;
  if (!username || !password || !email || !regnumber)
    return res
      .status(400)
      .json({ message: "email, username and password is required" });

  const duplicateLecturer=await Doctor.findOne({email:email}).exec()
  if (duplicateLecturer) return res.status(409).json({ message: "email is already exist" });

  try {
    const hashedPWD = await bcrypt.hash(password, 10)

    const newDoctor = await Doctor.create({
       "username": username,
       "email":email,
       "password": hashedPWD,
       "phone":phone,
       "address":address,
       "regnumber":regnumber
    })

    console.log(newDoctor)

    res.status(200).json({ success: `new doctor with ${username} created` });
  } catch (error) {
    res.status(500).json({ error: `${error.message}` });
  }
};
module.exports = { handleNewDoctor };
