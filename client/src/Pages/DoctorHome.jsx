import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/doctorHome.css";
import AddDiseaseModal from "../components/AddDisease";
import AddHospitalModal from "../components/AddHospital";
import PatientsModal from "../components/PatientsModel";
import AddHealthTips from "../components/AddHealthTips";
import axios from "axios";
const DoctorHome = () => {
  const navigate = useNavigate();
  const [showDiseaseModal, setShowDiseaseModal] = useState(false);
  const [showHospitalModal, setShowHospitalModal] = useState(false);
  const [showPatientsModal, setShowPatientsModal] = useState(false);
  const [showHealthTipModal, setShowHealthTipModal] = useState(false);
  const [doctorDetails, setDoctorDetails] = useState({});

  const handleAddDiseaseClick = () => {
    setShowDiseaseModal(true);
  };

  const handleSeePatientsClick = () => {
    setShowPatientsModal(true);
  };

  const handleAddHospitalClick = () => {
    setShowHospitalModal(true);
  };
  const handleAddHealthTipClick = () => {
    setShowHealthTipModal(true);
  };

  const handleCloseDiseaseModal = () => {
    setShowDiseaseModal(false);
  };
  const handleCloseHealthTipModal = () => {
    setShowHealthTipModal(false);
  };

  const handleCloseHospitalModal = () => {
    setShowHospitalModal(false);
  };

  const handleClosePatientsModal = () => {
    setShowPatientsModal(false);
  };
  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const userinfo = JSON.parse(localStorage.getItem("userinfo"));
        const email = userinfo?.email;
        if (email) {
          console.log(`Fetching doctor details for email: ${email}`);
          const response = await axios.get(
            `http://localhost:3001/auth/getDoctor/${email}`
          );
          setDoctorDetails(response.data);
        } else {
          console.log("No email found in localStorage.");
        }
      } catch (error) {
        console.error("Failed to fetch doctor details", error);
      }
    };

    fetchDoctorDetails();
  }, []);
  return (
      <div className="doctor-home">
        <div className="doctor-home-main-container">
          <div className="doctor-name-container">
          <h1>Welcome Dr. {doctorDetails.username?.toUpperCase()}</h1>
          </div>
          <div className="doctor-home-container">
            <div className="doctor-home-box" onClick={handleAddDiseaseClick}>
              <h2>Add a Disease</h2>
            </div>
            <div className="doctor-home-box" onClick={handleSeePatientsClick}>
              <h2>See Patients</h2>
            </div>
            <div className="doctor-home-box" onClick={handleAddHospitalClick}>
              <h2>Add a Hospital</h2>
            </div>
            <div className="doctor-home-box" onClick={handleAddHealthTipClick}>
              <h2>Add a Health Tip</h2>
            </div>
          </div>
        </div>
        {showDiseaseModal && (
          <AddDiseaseModal onClose={handleCloseDiseaseModal} />
        )}
        {showHospitalModal && (
          <AddHospitalModal onClose={handleCloseHospitalModal} />
        )}
        {showPatientsModal && (
          <PatientsModal onClose={handleClosePatientsModal} />
        )}
        {showHealthTipModal && (
          <AddHealthTips onClose={handleCloseHealthTipModal} />
        )}
      </div>
  );
};

export default DoctorHome;
