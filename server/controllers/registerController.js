const User = require("../models/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { username, email, password, phone, address, position, grade,subject,sex } =
    req.body;
  if (!username || !password || !email || !position )
    return res
      .status(400)
      .json({ message: "email, username and password is required" });

  const duplicateUser = await User.findOne({ email: email }).exec();
  if (duplicateUser)
    return res.status(409).json({ message: "email is already exist" });

  try {
    const hashedPWD = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username: username,
      email: email,
      password: hashedPWD,
      phone: phone,
      address: address,
      position: position,
      grade: grade,
      subject:subject,
      sex:sex,
    });

    console.log(newUser);

    res.status(200).json({ success: `new user created` });
  } catch (error) {
    res.status(500).json({ error: `${error.message}` });
  }
};
const updateUser = async (req, res) => {
  try {
    const { username, email, password, address, position, grade, subject } = req.body;
    const profileImage = req.file ? req.file.path : null;

    const query = { email };

    const updateFields = { username, password, address, position, grade, subject };
    if (profileImage) {
      updateFields.profile_img = profileImage;
    }

    const updatedUser = await User.findOneAndUpdate(query, updateFields, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ success: true, updatedUser });
  } catch (error) {
    res.status(500).json({ error: "Failed to update profile" });
  }
};

module.exports = { handleNewUser, updateUser };
