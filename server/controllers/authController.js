const Doctor = require("../models/Doctor");
const Hospital = require("../models/Hospital");
const Disease = require("../models/Disease");
const HealthTip = require("../models/HealthTip");
const BookDoctor = require("../models/BookedDocter");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Review=require("../models/Review")
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

const handleNewHospital = async (req, res) => {
  const { hospitalname, phone, address } = req.body;
  if (!hospitalname || !phone || !address)
    return res
      .status(400)
      .json({ message: "hospitalname,address and contact is required" });

  const duplicateHospital = await Hospital.findOne({
    hospitalname: hospitalname,
  }).exec();
  if (duplicateHospital)
    return res.status(409).json({ message: "hospital name is already exist" });

  try {
    const newHospital = await Hospital.create({
      hospitalname: hospitalname,
      phone: phone,
      address: address,
    });

    res
      .status(200)
      .json({ success: `new hospital with ${hospitalname} created` });
  } catch (error) {
    res.status(500).json({ error: `${error.message}` });
  }
};
const getHospitals = async (req, res) => {
  try {
    const filters = req.body;

    const result = await Hospital.find(filters);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch hospitals" });
  }
};
const updateHospital = async (req, res) => {
  try {
    const { hospitalname, address, phone } = req.body;

    const query = { hospitalname };

    const updatedHospital = await Hospital.findOneAndUpdate(
      query,
      { address, phone },
      { new: true }
    );

    if (!updatedHospital) {
      return res.status(404).json({ error: "Hospital not found" });
    }

    res.status(200).json(updatedHospital);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update hospital" });
  }
};

const deleteHospital = async (req, res) => {
  try {
    const { hospitalname } = req.body;

    const query = { hospitalname };

    const deletedHospital = await Hospital.findOneAndDelete(query);

    if (!deletedHospital) {
      return res.status(404).json({ error: "Hospital not found" });
    }

    res.status(200).json({ message: "Hospital deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete hospital" });
  }
};

const handleNewDisease = async (req, res) => {
  const { diseasename, description, symptoms, treatment } = req.body;
  if (!diseasename || !description || !symptoms || !treatment)
    return res
      .status(400)
      .json({ message: "hospitalname,address and contact is required" });

  const duplicateDisease = await Disease.findOne({
    diseasename: diseasename,
  }).exec();
  if (duplicateDisease)
    return res.status(409).json({ message: "disease is already exist" });

  try {
    const newDisease = await Disease.create({
      diseasename: diseasename,
      description: description,
      symptoms: symptoms,
      treatment: treatment,
    });

    res
      .status(200)
      .json({ success: `new Disease with ${diseasename} created` });
  } catch (error) {
    res.status(500).json({ error: `${error.message}` });
  }
};
const handleNewHealthTip = async (req, res) => {
  const { healthtipname, username, description } = req.body;
  if (!healthtipname) return res.status(400).json({ message: "required" });

  const duplicateHealthTip = await Disease.findOne({
    healthtipname: healthtipname,
  }).exec();
  if (duplicateHealthTip)
    return res.status(409).json({ message: "already exist" });

  try {
    const newHealthTip = await HealthTip.create({
      healthtipname: healthtipname,
      username: username,
      description: description,
    });

    res
      .status(200)
      .json({ success: `new Disease with ${healthtipname} created` });
  } catch (error) {
    res.status(500).json({ error: `${error.message}` });
  }
};
const createReview = async (req, res) => {
  const {name, review ,rating} = req.body;
  if (!review) return res.status(400).json({ message: "required" });

  try {
    await Review.create({
      name: name,
      review: review,
      rating:rating,
    });

    res
      .status(200)
      .json({ success: `new review created` });
  } catch (error) {
    res.status(500).json({ error: `${error.message}` });
  }
};
const bookDoctor = async (req, res) => {
  const { doctorname, username, email, age, address, regnumber } = req.body;
  if (!doctorname || !username || !email || !age || !address || !regnumber)
    return res.status(400).json({ message: "something went wrong" });

  const duplicatePatient = await BookDoctor.findOne({
    username: username,
    doctorname:doctorname
  }).exec();
  if (duplicatePatient)
    return res.status(409).json({ message: "already exist" });

  try {
    const bookDoctor = await BookDoctor.create({
      doctorname: doctorname,
      username: username,
      email: email,
      age: age,
      address: address,
      regnumber: regnumber,
    });

    res.status(200).json({ success: `new Book with ${doctorname} created` });
  } catch (error) {
    res.status(500).json({ error: `${error.message}` });
  }
};
const getPatients = async (req, res) => {
  try {
    const filters = req.body;

    const result = await BookDoctor.find(filters);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch" });
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
const getPatientsByDoctorName = async (req, res) => {
  try {
    const { doctorname } = req.params;
    const additionalFilters = req.body;

    const query = { doctorname, ...additionalFilters };

    const result = await BookDoctor.findOne(query);
    res.status(200).json(result);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch" });
  }
};
const getDisease = async (req, res) => {
  try {
    const filters = req.body;

    const result = await Disease.find(filters);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch" });
  }
};

const updateDisease = async (req, res) => {
  try {
    const { diseasename, description, symtems, treatment } = req.body;

    const query = { diseasename };
    const updatedDisease = await Disease.findOneAndUpdate(
      diseasename,
      { description, symtems, treatment },
      { new: true }
    );
    if (!updatedDisease) {
      return res.status(404).json({ error: "Disease  not found" });
    }
    res.status(200).json(updatedDisease);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update" });
  }
};

const deleteDisease = async (req, res) => {
  try {
    const { diseasename } = req.body;
    const query = { diseasename };

    const deleteDisease = await Disease.findByOneAndDelete(query);
    if (!deleteDisease) {
      return res.status(404).json({ error: "disease not found" });
    }
    res.status(200).json({ message: " deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete" });
  }
};
const deleteHealthTip = async (req, res) => {
  try {
    const { healthtipname } = req.body;
    const query = { healthtipname };

    const deleteHealthTip = await HealthTip.findByOneAndDelete(query);
    if (!deleteHealthTip) {
      return res.status(404).json({ error: " not found" });
    }
    res.status(200).json({ message: " deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete" });
  }
};
const getDoctorByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const additionalFilters = req.body;

    const query = { email, ...additionalFilters };

    const result = await Doctor.findOne(query);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch" });
  }
};
const getDoctorByRole = async (req, res) => {
  try {
    const { specialization } = req.params;
    const additionalFilters = req.body;

    const query = { specialization, ...additionalFilters };

    const result = await Doctor.findOne(query);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch" });
  }
};

module.exports = {
  handleLogin,
  handleNewDisease,
  deleteDisease,
  deleteHospital,
  getHospitals,
  getDisease,
  handleNewHospital,
  updateDisease,
  updateHospital,
  getDoctorByEmail,
  handleNewHealthTip,
  deleteHealthTip,
  bookDoctor,
  getDoctorByRole,
  getPatients,
  getPatientsByDoctorName,
  createReview,
  getReviews
};
