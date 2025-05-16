const User = require("../models/User");
const Student = require("../models/Student");
const Announcement = require("../models/Announcement");
const Achievement = require("../models/Achievement");
const Event = require("../models/Event");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const TimeLog = require("../models/TimeLog")
const Message = require("../models/Message")
const Application = require('../models/Application');

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "email and passwords are required" });

  const foundUser = await User.findOne({ email: email }).exec();
  if (!foundUser) return res.sendStatus(401);
  const matchPassword = await bcrypt.compare(password, foundUser.password);
  console.log("bcrypt password:", matchPassword);
  if (matchPassword) {
    const accessToken = jwt.sign(
      {
        userInfo: { username: foundUser.username },
        issuedAt: Date.now(),
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
const handleNewAnnouncement = async (req, res) => {
  const { description, image } = req.body;
  if (!description || !image) {
    return res.status(400).json({ message: "something is required" });
  }

  const duplicateImg = await Announcement.findOne({ image: image }).exec();
  if (duplicateImg) {
    return res.status(409).json({ message: "image is already exist" });
  }

  try {

    await Announcement.create({
      image,
      description,
    });

    res.status(200).json({ success: ` created` });
  } catch (error) {
    res.status(500).json({ error: `${error.message}` });
  }
};

const handleNewAchievement = async (req, res) => {
  const { description, image } = req.body;
  if (!description || !image) {
    return res.status(400).json({ message: "is required" });
  }

  const duplicateImage = await Achievement.findOne({ image: image }).exec();
  if (duplicateImage) {
    return res.status(409).json({ message: "already exist" });
  }

  try {

    await Achievement.create({
      image,
      description,
    });

    res.status(200).json({ success: `created` });
  } catch (error) {
    res.status(500).json({ error: `${error.message}` });
  }
};
const handleNewStudent = async (req, res) => {
  const { username, enrolNumber, idNumber, phone, enrolDate, image } = req.body;

  // Check for required fields
  if (!username || !enrolNumber || !phone || !enrolDate) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check for duplicate student by enrolNumber or idNumber
    const duplicateStudent = await Student.findOne({
      $or: [{ enrolNumber }]
    }).exec();

    if (duplicateStudent) {
      return res.status(409).json({ message: "Student already exists" });
    }

    // Create new student
    await Student.create({
      username,
      image,
      enrolNumber,
      idNumber,
      phone,
      enrolDate
    });

    res.status(201).json({ success: "Student created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const handleNewEvent = async (req, res) => {
  const { description, image } = req.body;
  if (!description || !image) {
    return res.status(400).json({ message: "something is required" });
  }

  const duplicateImg = await Event.findOne({ image: image }).exec();
  if (duplicateImg) {
    return res.status(409).json({ message: "image is already exist" });
  }

  try {

    await Event.create({
      image,
      description,
    });

    res.status(200).json({ success: ` created` });
  } catch (error) {
    res.status(500).json({ error: `${error.message}` });
  }
};
const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.status(200).json(announcements);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching announcements', error: error.message });
  }
};
const getAchievements = async (req, res) => {
  try {
    const filters = req.body;

    const result = await Achievement.find(filters);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch hospitals" });
  }
};
const getEvents = async (req, res) => {
  try {
    const filters = req.body;
    const result = await Event.find(filters);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch hospitals" });
  }
};
const deleteAnnouncement = async (req, res) => {
  try {
    const { index } = req.body;

    const query = { index };

    const deleteByIndex = await Announcement.findOneAndDelete(query);

    if (!deleteByIndex) {
      return res.status(404).json({ error: " not found" });
    }

    res.status(200).json({ message: "deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete" });
  }
};
const deleteAchievement = async (req, res) => {
  try {
    const { index } = req.body;

    const query = { index };

    const deleteByIndex = await Achievement.findOneAndDelete(query);

    if (!deleteByIndex) {
      return res.status(404).json({ error: " not found" });
    }

    res.status(200).json({ message: "deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete" });
  }
};
const deleteEvent = async (req, res) => {
  try {
    const { index } = req.body;

    const query = { index };

    const deleteByIndex = await Event.findOneAndDelete(query);

    if (!deleteByIndex) {
      return res.status(404).json({ error: " not found" });
    }

    res.status(200).json({ message: "deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete" });
  }
};
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteById = await Student.findByIdAndDelete(id);

    if (!deleteById) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete student" });
  }
};
const deleteApplication = async (req, res) => {
  try {
    const { fileType } = req.params;

    // Assuming you're deleting based on a field like 'type'
    const result = await Application.deleteMany({ fileType: fileType });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "No applications found with that file type" });
    }

    res.status(200).json({ message: "Deleted successfully", deletedCount: result.deletedCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete applications" });
  }
};


const getUsers = async (req, res) => {
  try {
    const filters = req.body;
    const result = await User.find(filters);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch" });
  }
};
const getStudents = async (req, res) => {
  try {
    const filters = req.body;
    const result = await Student.find(filters);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch" });
  }
};
const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const additionalFilters = req.body;

    const query = { email, ...additionalFilters };

    const result = await User.findOne(query);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch" });
  }
};
const getApplication = async (req, res) => {
  try {
    const { fileType } = req.params;
    const query = { fileType };

    const result = await Application.findOne(query);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch" });
  }
};
const getUserByGrade = async (req, res) => {
  try {
    const { grade } = req.params;
    const additionalFilters = req.body;

    const query = { grade, ...additionalFilters };

    const result = await User.findOne(query);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch" });
  }
};
const getUsersByPosition = async (req, res) => {
  try {
    const { position } = req.params;
    const additionalFilters = req.body;

    const query = { position, ...additionalFilters };

    const result = await User.findOne(query);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch" });
  }
};

const handleLogDate = async (req, res) => {
  const { username, email, status, date } = req.body;
  try {
    await TimeLog.create({
      username,
      email,
      date,
      status,
    });

    res.status(201).json({ success: "Successfully Logged" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const handleSendMessage = async (req, res) => {
  const { recieverName, senderEmail, message,recieverEmail,senderName } = req.body;
  try {
    await Message.create({
      recieverName,
      senderEmail,
      recieverEmail,
      message,
      senderName,
    });

    res.status(201).json({ success: "Successfully Created" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
const handleAddApplication = async (req, res) => {
  const { deadLine, fileType, file} = req.body;
  try {
    await Application.create({
      deadLine,
      fileType,
      file,
    });

    res.status(201).json({ success: "Successfully Created" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getTimeLogs = async (req, res) => {
  try {
    const filters = req.body;
    const result = await TimeLog.find(filters);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch" });
  }
};
const getTimeLogsByEmail = async (req, res) => {
  try {
    const { email } = req.query; // Use query param for GET requests

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const logs = await TimeLog.find({ email }); // find all logs for that email

    res.status(200).json(logs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch time logs" });
  }
};

const updateTimeLog = async (req, res) => {
  try {
    const { status, email, date } = req.body;

    const query = { email, date: new Date(date).toISOString() };

    const updatedTimeLog = await TimeLog.findOneAndUpdate(
      query,
      { status },
      { new: true }
    );

    if (!updatedTimeLog) {
      return res.status(404).json({ error: "Log not found to update" });
    }

    res.status(200).json(updatedTimeLog);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: "Failed to update" });
  }
};
const getMessagesByRecieverEmail = async (req, res) => {
  try {
    const { recieverEmail } = req.params; // Use query param for GET requests

    if (!recieverEmail) {
      return res.status(400).json({ error: "Email is required" });
    }

    const logs = await Message.find({ recieverEmail }); // find all logs for that email

    res.status(200).json(logs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};
const getMessagesBySenderEmail = async (req, res) => {
  try {
    const { senderEmail } = req.params; // Use query param for GET requests

    if (!senderEmail) {
      return res.status(400).json({ error: "Email is required" });
    }
    
    const logs = await Message.find({ senderEmail }); // find all logs for that email

    res.status(200).json(logs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};
module.exports = {
  deleteApplication,
  getApplication,
  handleAddApplication,
  handleSendMessage,
  getMessagesByRecieverEmail,
  getMessagesBySenderEmail,
  handleLogDate,
  getTimeLogs,
  getTimeLogsByEmail,
  updateTimeLog,
  handleLogin,
  getUsersByPosition,
  getUserByGrade,
  getUserByEmail,
  deleteEvent,
  deleteAchievement,
  deleteAnnouncement,
  getEvents,
  getAchievements,
  handleNewEvent,
  getAnnouncements,
  handleNewAchievement,
  handleNewAnnouncement,
  getUsers,
  getStudents,
  handleNewStudent,
  deleteStudent
};
