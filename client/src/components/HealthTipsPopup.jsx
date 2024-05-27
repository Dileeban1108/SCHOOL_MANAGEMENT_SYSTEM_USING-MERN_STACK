import React from "react";
import "../styles/healthTipsPopup.css";

const healthTips = [
  "Eat well",
  "Sleep well",
  "Drink at least 1 liter of water daily",
  "Exercise regularly",
  "Maintain a balanced diet",
  "Avoid junk food",
  "Practice mindfulness",
  "Get regular medical checkups",
  "Limit alcohol consumption",
  "Quit smoking",
  "Maintain good hygiene",
  "Stay hydrated",
  "Eat more fruits and vegetables",
  "Reduce sugar intake",
  "Get enough sunlight",
  "Take breaks from screens",
  "Practice good posture",
  "Stay socially connected",
  "Manage stress effectively",
  "Stay active",
];

const HealthTipsPopup = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content_5">
        <div className="button-container_4">
          <h2>Health Tips</h2>
          <button className="close-button_5" onClick={onClose}>
            X
          </button>
        </div>
        <div className="health-tips-list">
          {healthTips.map((tip, index) => (
            <div key={index} className="health-tip-box">
              {tip}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthTipsPopup;
