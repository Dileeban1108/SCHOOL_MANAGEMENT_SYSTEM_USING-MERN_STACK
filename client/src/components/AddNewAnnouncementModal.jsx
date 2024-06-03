import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AddNewEventModal = ({ show, onClose, userDetails }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    image: null,
    description: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({
        ...formData,
        image: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("image", formData.image);
    formDataToSend.append("description", formData.description);

    try {
      const response = await axios.post(
        "http://localhost:3001/auth/createAnnouncement",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response && response.data.success) {
        toast.success("Successfully created ");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
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
        <h2>Add New Event</h2>
        <form onSubmit={handleSubmit}>
          <div className="inputs">
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
            />
          </div>
          <div className="inputs">
            <label>Description:</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="submit">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewEventModal;
