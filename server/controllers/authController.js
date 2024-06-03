const User = require("../models/User");
const Announcement = require("../models/Announcement");
const Achievement = require("../models/Achievement");
const Event = require("../models/Event");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Review=require("../models/Review")
const upload = require("../middlewares/upload"); 

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
  upload(req, res, async function (err) {
    if (err) return res.status(500).json({ message: 'File upload failed' });

    const imageUrl = req.file.path;
    const { description } = req.body;

    if (!imageUrl || !description) return res.status(400).json({ message: 'Image and description are required' });

    const duplicate = await Announcement.findOne({ image: imageUrl }).exec();
    if (duplicate) return res.status(409).json({ message: 'Announcement already exists' });

    try {
      await Announcement.create({ image: imageUrl, description });
      res.status(200).json({ success: 'Announcement created' });
    } catch (error) {
      res.status(500).json({ error: `${error.message}` });
    }
  });
};

const handleNewAchievement = async (req, res) => {
  upload(req, res, async function (err) {
    if (err) return res.status(500).json({ message: 'File upload failed' });

    const imageUrl = req.file.path;
    const { description } = req.body;

    if (!imageUrl || !description) return res.status(400).json({ message: 'Image and description are required' });

    const duplicate = await Achievement.findOne({ image: imageUrl }).exec();
    if (duplicate) return res.status(409).json({ message: 'Achievement already exists' });

    try {
      await Achievement.create({ image: imageUrl, description });
      res.status(200).json({ success: 'Achievement created' });
    } catch (error) {
      res.status(500).json({ error: `${error.message}` });
    }
  });
};

const handleNewEvent = async (req, res) => {
  upload(req, res, async function (err) {
    if (err) return res.status(500).json({ message: 'File upload failed' });

    const imageUrl = req.file.path;
    const { description } = req.body;

    if (!imageUrl || !description) return res.status(400).json({ message: 'Image and description are required' });

    const duplicate = await Event.findOne({ image: imageUrl }).exec();
    if (duplicate) return res.status(409).json({ message: 'Event already exists' });

    try {
      await Event.create({ image: imageUrl, description });
      res.status(200).json({ success: 'Event created' });
    } catch (error) {
      res.status(500).json({ error: `${error.message}` });
    }
  });
};

const getAnnouncements = async (req, res) => {
  try {
    const filters = req.body;

    const result = await Announcement.find(filters);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch hospitals" });
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
const createReview = async (req, res) => {
  const {name, review } = req.body;
  if (!review) return res.status(400).json({ message: "required" });

  try {
    await Review.create({
      name: name,
      review: review,
    });

    res
      .status(200)
      .json({ success: `new review created` });
  } catch (error) {
    res.status(500).json({ error: `${error.message}` });
  }
};
const getReviews = async (req, res) => {
  try {
    const filters = req.body;

    const result = await Review.find(filters);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch" });
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
    const { position} = req.params;
    const additionalFilters = req.body;

    const query = { position, ...additionalFilters };

    const result = await User.findOne(query);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch" });
  }
};

module.exports = {
  handleLogin,
  getUsersByPosition,
  getUserByGrade,
  getUserByEmail,
  deleteEvent,
  deleteAchievement,
  createReview,
  getReviews,
  deleteAnnouncement,
  getEvents,
  getAchievements,
  handleNewEvent,
  getAnnouncements,
  handleNewAchievement,
  handleNewAnnouncement,
  getUsers,
};
