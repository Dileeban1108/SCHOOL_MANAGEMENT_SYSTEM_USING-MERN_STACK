const Doctor=require('../models/Doctor')
const bcrypt = require("bcrypt");

const handleNewDoctor = async (req, res) => {
  const {username,email, password,phone,address,regnumber,hospital,specialization} = req.body;
  if (!username || !password || !email || !regnumber  ||!specialization)
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
       "regnumber":regnumber,
       "hospital":hospital,
       "specialization":specialization,
    })

    console.log(newDoctor)

    res.status(200).json({ success: `new doctor with ${username} created` });
  } catch (error) {
    res.status(500).json({ error: `${error.message}` });
  }
};
const updateDoctor = async (req, res) => {
  try {
    const {username,email, password,phone,address,regnumber,hospital,specialization} = req.body;

    const query = { email };

    const updatedDoctor = await Doctor.findOneAndUpdate(
      query,
      { password,phone,address,regnumber,hospital,specialization,username },
      { new: true }
    );

    if (!updatedDoctor) {
      return res.status(404).json({ error: "Hospital not found" });
    }

    res.status(200).json(updatedDoctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update hospital" });
  }
};

module.exports = { handleNewDoctor,updateDoctor };
