import React, { useState, useEffect } from "react";
import "../styles/profileModal.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import users from "../assets/users.jpg";

const ProfileModal = ({ show, onClose, userDetails }) => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(users);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
    position: "",
    grade: "",
    subject: "",
    sex: "",
    password: "",
  });

  const positions = [
    "Select Position",
    "principal",
    "vice principal",
    "teacher",
    "sport coach",
  ];
  const sexes = ["Select Sex", "male", "female"];
  const grades = [
    "Select Grade",
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
    "Select Subject",
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
        phone: userDetails.phone,
        address: userDetails.address,
        grade: userDetails.grade,
        position: userDetails.position,
        subject: userDetails.subject,
        sex: userDetails.sex,
        password: "",
      });
      setImagePreview(userDetails.image || users);
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
    const file = e.target.files[0];
    if (file && file.type.substring(0, 5) === "image") {
      setProfileImage(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      toast.error("Please select a valid image file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = userDetails.image || ""; // Default to existing image URL

      // Upload image if profileImage is not null
      if (profileImage) {
        const formData = new FormData();
formData.append("file", profileImage); // ✅
        const uploadResponse = await axios.post(
          "http://localhost:3001/upload",
          formData
        );
        imageUrl = uploadResponse.data.filePath;
      }

      // Prepare data to update
      const updatedData = {
        email: userDetails.email,
        password: formData.password,
        image: imageUrl,
        username: formData.username,
        phone: formData.phone,
        address: formData.address,
        position: formData.position,
        grade: formData.grade,
        subject: formData.subject,
        sex: formData.sex,
      };

      // Update user profile only if any field has been updated
      const hasChanged = Object.keys(updatedData).some(
        (key) => updatedData[key] !== userDetails[key]
      );

      if (hasChanged || imageUrl !== userDetails.image) {
        const updateResponse = await axios.put(
          "http://localhost:3001/register/update",
          updatedData
        );

        toast.success("Successfully updated!");
        setTimeout(() => {
          onClose(); // Close the modal
          window.location.reload();
        }, 1000);

        console.log(updateResponse.data); // Handle the response as needed
      } else {
        toast.info("No changes to update.");
      }
    } catch (error) {
      toast.error("Error updating profile");

      console.error("Error updating profile:", error);
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
          <div className="update_profile_section">
            <img src={imagePreview} alt="profile" />
            <label htmlFor="prof_image">
              <FontAwesomeIcon icon={faCamera} />
            </label>
          </div>
          <input
            id="prof_image"
            className="profile-image"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            name="image"
          />
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
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter new password"
            />
          </div>
          <div className="inputs">
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} readOnly />
          </div>
          <div className="inputs">
            <label>Phone:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
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
            <label>Position:</label>
            <select
              name="position"
              value={formData.position}
              onChange={handleChange}
            >
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
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
            >
              {subjects.map((subject, index) => (
                <option key={index} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>
          <div className="inputs">
            <label>Sex:</label>
            <select name="sex" value={formData.sex} onChange={handleChange}>
              {sexes.map((sex, index) => (
                <option key={index} value={sex}>
                  {sex}
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
