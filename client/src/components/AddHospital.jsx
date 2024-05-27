import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/popupModel.css';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const AddHospital = ({ onClose }) => {
  const [hospitalname, setHospitalName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/auth/createHospital", {
        hospitalname,
        address,
        phone
      });
      if (response && response.data.success) {
        toast.success("Successfully added");
        navigate("/");
      } else {
        toast.error("failed to add hospital. Please check your credentials.");
      }
    } catch (error) {
      toast.error("An error occurred while adding the hospital.");
    }
    onClose();
  };

  return (
    <div className="modal-overlay">
            <ToastContainer position="top-right" />
      <div className="modal-content">
        <div className="button-container">
          <h2>Add a Hospital</h2>
          <button className="close-button_4" onClick={onClose}>
            X
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              value={hospitalname}
              onChange={(e) => setHospitalName(e.target.value)}
              required
              placeholder="Hospital Name"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              placeholder="Address"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="Phone"
            />
          </div>
          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddHospital;
