import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/popupModel.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddDisease = ({ onClose }) => {
  const [diseasename, setDiseaseName] = useState("");
  const [description, setDescription] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [treatment, setTreatment] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/createDisease",
        {
          diseasename,
          description,
          symptoms,
          treatment,
        }
      );
      if (response && response.data.success) {
        setTimeout(() => {
          toast.success("Successfully added");
          navigate("/");
          window.location.reload();
        });
      } else {
        toast.error("failed to add disease. Please check your credentials.");
      }
    } catch (error) {
      toast.error("An error occurred while adding the disease.");
    }
  };

  return (
    <div className="modal-overlay">
      <ToastContainer position="top-right" />
      <div className="modal-content">
        <div className="button-container">
          <h2>Add a Disease</h2>
          <button className="close-button_4" onClick={onClose}>
            X
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              value={diseasename}
              onChange={(e) => setDiseaseName(e.target.value)}
              required
              placeholder="Disease Name"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Description"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              required
              placeholder="Symptoms"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              value={treatment}
              onChange={(e) => setTreatment(e.target.value)}
              required
              placeholder="Treatment"
            />
          </div>
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDisease;
