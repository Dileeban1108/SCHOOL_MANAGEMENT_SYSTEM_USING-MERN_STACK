import React, { useState, useEffect } from "react";
import "../styles/profileModal.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ProfileModal = ({ show, onClose, userDetails }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    address: "",
    position: "",
    grade: "",
    subject: "",
    password: "",
  });
  const [profileImage, setProfileImage] = useState(null);

  const positions = [
    "none",
    "principal",
    "vice principal",
    "teacher",
    "sport coach",
  ];
  const grades = [
    "grade 1",
    "grade 2",
    "grade 3",
    "grade 5",
    "grade 6",
    "grade 7",
    "grade 8",
    "grade 9",
    "grade 10",
    "grade 11",
    "A/L Science section",
    "A/L Commerce section",
    "A/L Art section",
    "A/L Technology section",
  ];
  const subjects = [
    "O/L Maths",
    "O/L Science",
    "O/L English",
    "O/L Sinhala",
    "O/L Tamil",
    "O/L Buddhism",
    "O/L Commerce",
    "O/L Geography",
    "O/L Art",
    "O/L Music",
    "O/L Dance",
    "O/L History",
    "A/L Physics",
    "A/L Chemistry",
    "A/L Combined Maths",
    "A/L Biology",
    "A/L Accounting",
    "A/L Economics",
    "A/L Business Studies",
    "A/L Sinhala",
    "A/L Geography",
    "A/L History",
    "A/L Engineering Technology",
    "A/L Bio System Technology",
    "A/L Science For Technology",
  ];

  useEffect(() => {
    if (userDetails) {
      setFormData({
        username: userDetails.username,
        email: userDetails.email,
        address: userDetails.address,
        grade: userDetails.grade,
        position: userDetails.position,
        subject: userDetails.subject,
        password: "", // Initialize password as empty
      });
    }
  }, [userDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateData = new FormData();
    updateData.append("username", formData.username);
    updateData.append("email", formData.email);
    updateData.append("address", formData.address);
    updateData.append("position", formData.position);
    updateData.append("grade", formData.grade);
    updateData.append("subject", formData.subject);
    updateData.append("password", formData.password); // Include password in form data
    if (profileImage) {
      updateData.append("profileImage", profileImage);
    }

    try {
      const response = await axios.put("http://localhost:3001/register/update", updateData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        toast.success("Successfully Updated The Profile!");
        navigate("/");
        window.location.reload(); // Reload the window after navigation
      } else {
        toast.error(response.data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Failed to update profile", error.response ? error.response.data : error.message);
      toast.error("Failed to update profile");
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <ToastContainer position="top-right" />
      <button className="cancel_button_2" onClick={onClose}>
        X
      </button>
      <div className="modal-content_6">
        <h2>Update Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="inputs">
            <label>Profile Image:</label>
            <input type="file" name="profileImage" onChange={handleFileChange} />
          </div>
          <div className="inputs">
            <label>Name:</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} />
          </div>
          <div className="inputs">
            <label>Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
          </div>
          <div className="inputs">
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} readOnly />
          </div>
          <div className="inputs">
            <label>Address:</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} />
          </div>
          <div className="inputs">
            <label>Position:</label>
            <select name="position" value={formData.position} onChange={handleChange}>
              {positions.map((position, index) => (
                <option key={index} value={position}>
                  {position}
                </option>
              ))}
            </select>
          </div>
          <div className="inputs">
            <label>Grade:</label>
            <select name="grade" value={formData.grade} onChange={handleChange}>
              {grades.map((grade, index) => (
                <option key={index} value={grade}>
                  {grade}
                </option>
              ))}
            </select>
          </div>
          <div className="inputs">
            <label>Subject:</label>
            <select name="subject" value={formData.subject} onChange={handleChange}>
              {subjects.map((subject, index) => (
                <option key={index} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="submit">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;
