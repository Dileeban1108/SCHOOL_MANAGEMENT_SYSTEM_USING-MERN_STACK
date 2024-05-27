import React, { useState } from "react";
import SpecialistPopup from "../components/SpecialistPopup";
import "../styles/bookDoctor.css";
import { useNavigate } from "react-router-dom";
import eyeimg from "../assets/eye.jpg";
import skinimg from "../assets/skin.jpg";
import earimg from "../assets/ear.jpg";
import heartimg from "../assets/heart.jpg";
import liverimg from "../assets/liver.jpg";
import phyimg from "../assets/phy.jpg";
import kidneyimg from "../assets/kidney.jpg";
import dentistimg from "../assets/dentist.jpg";
import vetimg from "../assets/vet.jpg";
import radioimg from "../assets/radio.png";

const specialists = [
  { name: "Eye Specialist", image: eyeimg },
  { name: "Skin Specialist", image: skinimg },
  { name: "Ear Specialist", image: earimg },
  { name: "Heart Specialist", image: heartimg },
  { name: "Liver Specialist", image: liverimg },
  { name: "Kidney Specialist", image: kidneyimg },
  { name: "Dentist", image: dentistimg },
  { name: "Veterinarian", image: vetimg },
  { name: "Radiologist", image: radioimg },
  { name: "Physiotherapist", image: phyimg },
];

const BookDoctorPage = () => {
  const navigate = useNavigate();

  const [selectedSpecialist, setSelectedSpecialist] = useState(null);

  const handleSpecialistClick = (specialist) => {
    setSelectedSpecialist(specialist);
  };

  const handleClosePopup = () => {
    setSelectedSpecialist(null);
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="book-doctor-page">
      <div className="speacialist-main-container">
        <div id="pointer" onClick={handleBack}>
          <h1>Back To Home</h1>
        </div>

        <div className="sub-specialist-container">
          <h1>Book a Doctor</h1>
          <div className="specialist-container">
            {specialists.map((specialist, index) => (
              <div
                key={index}
                className="specialist-box"
                onClick={() => handleSpecialistClick(specialist)}
                style={{ backgroundImage: `url(${specialist.image})` }}
              >
                <h2>{specialist.name}</h2>
              </div>
            ))}
          </div>
        </div>

        {selectedSpecialist && (
          <SpecialistPopup
            specialist={selectedSpecialist}
            onClose={handleClosePopup}
          />
        )}
      </div>
    </div>
  );
};

export default BookDoctorPage;
