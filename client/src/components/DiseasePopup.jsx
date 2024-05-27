import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/diseasePopup.css";

const DiseasePopup = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [diseases, setDiseases] = useState([]);
  const [filteredDiseases, setFilteredDiseases] = useState([]);

  useEffect(() => {
    const fetchDiseases = async () => {
      try {
        const response = await axios.get("http://localhost:3001/auth/getDisease");
        setDiseases(response.data);
        setFilteredDiseases(response.data);
      } catch (error) {
        console.error("Failed to fetch diseases", error);
      }
    };

    fetchDiseases();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = diseases.filter((disease) =>
      disease.symtems.toLowerCase().includes(term) ||
      disease.diseasename.toLowerCase().includes(term)
    );
    setFilteredDiseases(filtered);
  }

  return (
    <div className="popup-overlay_3">
      <div className="popup-content_3">
        <div className="button-container_2">
          <h2>Identify Your Disease</h2>
          <button className="close-button_3" onClick={onClose}>
            X
          </button>
        </div>
        <div className="disease-contents">
          <div className="search-box_2">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Enter symptoms or disease name..."
            />
          </div>
          <div className="diseases-list">
            {filteredDiseases.length > 0 ? (
              filteredDiseases.map((disease, index) => (
                <div key={index} className="disease-box">
                  <h3>{disease.diseasename}</h3>
                  <p>Symptoms: {disease.symtems}</p>
                  <p> {disease.description}</p>
                  <p>Treatment: {disease.treatment}</p>
                </div>
              ))
            ) : (
              <p>Try with booking a doctor</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseasePopup;
