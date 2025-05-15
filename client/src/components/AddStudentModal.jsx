import React, { useState } from "react";
import axios from "axios";
import "../styles/addStudentModal.css";
import users from "../assets/users.jpg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Show2StudentModal from "./StudentModal";

const AddStudentModal = ({ show, onClose }) => {
  const [username, setUsername] = useState("");
  const [enrolNumber, setEnrolNumber] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [enrolDate, setEnrolDate] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    let imageUrl = "";

    if (image) {
      // Only upload if image is selected
      const formData = new FormData();
      formData.append("image", image);

      const uploadResponse = await axios.post(
        "http://localhost:3001/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      imageUrl = uploadResponse.data.filePath;
    }

    // Now create student, with or without image
    const response = await axios.post(
      "http://localhost:3001/auth/createStudent",
      {
        username,
        enrolNumber,
        idNumber,
        phone,
        enrolDate,
        image: imageUrl, // will be empty if no image
      }
    );

    if (response && response.data.success) {
      toast.success("Successfully added a student!");
      setTimeout(() => {
        onClose();
        navigate("/");
        window.location.reload();
      }, 1000);
    } else {
      toast.error(response.data.message || "Something went wrong");
    }
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong");
  }
};


  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.substring(0, 5) === "image") {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Set preview URL
    } else {
      setImage(null);
      setPreview(null); // Reset preview
      toast.error("Please select a valid image file.");
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="close-btn_3">
          X
        </button>
        <h2>Add Student</h2>
        <form onSubmit={handleSubmit}>
          <div className="student_section">
            <img src={preview || users} alt="student" />
            <label htmlFor="stu_image">Add Image</label>
          </div>
          <input
            style={{ display: "none" }}
            id="stu_image"
            className="add_input_box"
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          <input
            className="add_input_box"
            type="text"
            name="username"
            placeholder="Student Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className="add_input_box"
            type="text"
            name="enrolNumber"
            placeholder="Enrollment Number"
            value={enrolNumber}
            onChange={(e) => setEnrolNumber(e.target.value)}
            required
          />
          <input
            className="add_input_box"
            type="date"
            name="enrolDate"
            value={enrolDate}
            onChange={(e) => setEnrolDate(e.target.value)}
            required
          />
          <input
            className="add_input_box"
            type="text"
            name="idNumber"
            placeholder="ID Number"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
          />
          <input
            className="add_input_box"
            type="text"
            name="contactNumber"
            placeholder="Contact Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <button type="submit" className="add-btn">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStudentModal;
