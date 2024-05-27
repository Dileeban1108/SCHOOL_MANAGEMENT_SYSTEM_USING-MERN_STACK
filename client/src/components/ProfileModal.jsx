import React, { useState, useEffect } from "react";
import "../styles/profileModal.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ProfileModal = ({ show, onClose, doctorDetails }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    address: "",
    registerNumber: "",
    hospital: "",
    specializedPath: "",
  });
  const specializationOptions = [
    "none",
    "Eye Specialist",
    "Skin Specialist",
    "Ear Specialist",
    "Heart Specialist",
    "Liver Specialist",
    "Kidney Specialist",
    "Dentist",
    "Veterinarian",
    "Radiologist",
    "Physiotherapist",
  ];
  useEffect(() => {
    if (doctorDetails) {
      setFormData({
        username: doctorDetails.username,
        email: doctorDetails.email,
        password: "",
        address: doctorDetails.address,
        registerNumber: doctorDetails.regnumber,
        hospital: doctorDetails.hospital,
        specializedPath: doctorDetails.specialization,
      });
    }
  }, [doctorDetails]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        "http://localhost:3001/register/update",
        {
          username: formData.username,
          password: formData.password,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          regnumber: formData.registerNumber,
          hospital: formData.hospital,
          specialization: formData.specializedPath,
        }
      );

      toast.success("Successfully Updated The Profile!");
      navigate("/");
      window.location.reload(); // Reload the window after navigation
    } catch (error) {
      console.error(
        "Failed to update profile",
        error.response ? error.response.data : error.message
      );
      toast.error("Failed to update profile");
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <ToastContainer position="top-right" />
      <div className="modal-content_6">
        <h2>Update Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="inputs">
            <label>Name:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="inputs">
            <label>Password:</label>
            <input
              type="text"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="inputs">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              readOnly
            />
          </div>
          <div className="inputs">
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div className="inputs">
            <label>Register Number:</label>
            <input
              type="text"
              name="registerNumber"
              value={formData.registerNumber}
              onChange={handleChange}
            />
          </div>
          <div className="inputs">
            <label>Hospital:</label>
            <input
              type="text"
              name="hospital"
              value={formData.hospital}
              onChange={handleChange}
            />
          </div>
          <div className="inputs">
            <label>Specialized Path:</label>
            <select
              name="specializedPath"
              value={formData.specializedPath}
              onChange={handleChange}
            >
              {specializationOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Update</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;
