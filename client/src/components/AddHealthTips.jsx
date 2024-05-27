import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/popupModel.css';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddHealthTips = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [healthtipname, setHealthtipname] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/auth/createHealthTip", {
        username,
        healthtipname,
        description,
      });
      if (response && response.data.success) {
        toast.success("Successfully added");
        navigate("/");
      } else {
      }
    } catch (error) {
      toast.error("failed to add healthtip. Please check your credentials.");
    }
    onClose();
  };

  return (
    <div className="modal-overlay">
            <ToastContainer position="top-right" />
      <div className="modal-content">
        <div className="button-container">
          <h2>Add a HealthTip</h2>
          <button className="close-button_4" onClick={onClose}>
            X
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Your Name"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              value={healthtipname}
              onChange={(e) => setHealthtipname(e.target.value)}
              required
              placeholder="Health Tip"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="description"
            />
          </div>
          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddHealthTips;
