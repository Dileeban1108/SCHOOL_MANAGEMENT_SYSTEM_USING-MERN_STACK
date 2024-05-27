import React from "react";
import "../styles/hospitalListModel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const HospitalListModel = ({ hospitals, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content_2">
        <div className="button-container_2">
          <h2>Hospitals</h2>
          <button className="close-button_10" onClick={onClose}>
            X
          </button>
        </div>
        <div className="hospital-list_3">
          {hospitals.map((hospital, index) => (
            <div key={index} className="hospital-box_3">
              <h3>{hospital.hospitalname}</h3>
              <div className="location-icon_2">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  style={{ color: "red" }}
                />
                <span>{hospital.address}</span>
                <span className="number">+94{hospital.phone}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HospitalListModel;
