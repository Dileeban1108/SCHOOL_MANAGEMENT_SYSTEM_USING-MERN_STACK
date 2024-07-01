const User = require("../models/User");
const Student = require("../models/Student");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { username, email, password, phone, address, position, grade, sex, image,subject } = req.body;
  if (!username || !password || !email || !position || !grade) {
    return res.status(400).json({ message: "email, username and password is required" });
  }

  const duplicateUser = await User.findOne({ email: email }).exec();
  if (duplicateUser) {
    return res.status(409).json({ message: "email is already exist" });
  }

  try {
    const hashedPWD = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPWD,
      phone,
      address,
      position,
      grade,
      sex,
      image,
      subject,
    });

    res.status(200).json({ success: `new user created` });
  } catch (error) {
    res.status(500).json({ error: `${error.message}` });
  }
};

const updateUser = async (req, res) => {
  try {
    
    const { username, email, password, phone, address, position, grade, sex, image, subject } = req.body;

    // Example: assuming 'image' contains the file path from the upload endpoint
    const imageUrl = image; 

    const query = { email };

    const updatedUser = await User.findOneAndUpdate(
      query,
      { password, phone, address, grade, position, username, sex, image: imageUrl, subject },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update profile" });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, enrolNumber, idNumber, phone, enrolDate, image } = req.body;

    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { username, enrolNumber, idNumber, phone, enrolDate, image },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ error: "Failed to update student" });
  }
};


module.exports = { handleNewUser, updateUser,updateStudent };
