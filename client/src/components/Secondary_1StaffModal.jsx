import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/staffModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import userPlaceholderImage from "../assets/users.jpg";

const allowedGrades = ["grade 6", "grade 7", "grade 8", "grade 9", "grade 10","grade 11"];

const fetchUsers = async () => {
  try {
    const response = await axios.get(`http://localhost:3001/auth/getUsers`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user details", error);
    return [];
  }
};

const PrimaryStaffModal = ({ show, onClose }) => {
  const [usersData, setUsersData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      const data = await fetchUsers();
      console.log("Fetched Users: ", data); // Log fetched users for debugging
      setUsersData(data);
    };

    if (show) {
      getUsers();
    }
  }, [show]);

  if (!show) {
    return null;
  }

  const filteredUsers = usersData.filter(
    (user) =>
      allowedGrades.includes(user.grade.toLowerCase()) &&
      (user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.grade.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="modal-overlay">
      <button onClick={onClose} className="cancel-btn">
        X
      </button>
      <div className="modal-content_s">
      <h2 className="staff_header">Staff</h2>
        <div className="searchinput">
          <input
            type="text"
            placeholder="Search Staff Name or Grade"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="icon">
            <FontAwesomeIcon icon={faSearch} />
          </div>
        </div>
        <div className="staff">
          {filteredUsers.map((user) => {
            const greeting = user.sex === "female" ? "Ms." : "Mr.";
            return (
              <div key={user.id} className="user_box_2">
                <img
                  src={user.image || userPlaceholderImage}
                  alt={user.username}
                  className="user-image_2"
                />
                <div className="user-info_2">
                  <h2>
                    {greeting} {user.username}
                  </h2>
                  <p>{user.position}</p>
                  <p style={{fontSize:".9rem"}}>{user.grade}</p>
                  <p>{user.phone}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PrimaryStaffModal;
