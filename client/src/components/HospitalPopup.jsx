import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/hospitalPopup.css";


const HospitalPopup = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [hospitals, setHospitals] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState(hospitals);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.get("http://localhost:3001/auth/getHospital");
        setHospitals(response.data);
        setFilteredHospitals(response.data);
      } catch (error) {
        console.error("Failed to fetch hospital", error);
      }
    };
    fetchHospitals();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = hospitals.filter(
      (hospital) =>
        hospital.hospitalname.toLowerCase().includes(term) ||
        hospital.address.toLowerCase().includes(term)
    );
    setFilteredHospitals(filtered);
  };

  return (
    <div className="popup-overlay_4">
      <div className="popup-content_4">
        <div className="button-container_3">
          <h2>Find Nearest Hospital</h2>
          <button className="close-button_4" onClick={onClose}>
            X
          </button>
        </div>
        <div className="hospitai-contents">
          <div className="search-box_3">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Enter hospital name or location..."
            />
          </div>
          <div className="hospital-list">
            {filteredHospitals.length > 0 ? (
              filteredHospitals.map((hospital, index) => (
                <div key={index} className="hospital-box_3">
                  <h3>{hospital.hospitalname}</h3>
                  <p>Address: {hospital.address}</p>
                </div>
              ))
            ) : (
              <p>No hospitals found. Try booking a doctor instead.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalPopup;
