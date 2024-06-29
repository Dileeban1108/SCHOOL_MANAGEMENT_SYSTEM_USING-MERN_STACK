import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/section.css";
import {
  faPhone,
  faLocation,
  faDownload,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavBar from "../components/Navbar";
import userPlaceholderImage from "../assets/users.jpg";

const allowedGrades = [
  "A/L Science section",
  "A/L Commerce section",
  "A/L Art section",
  "A/L Technology section",
];
const fetchUsers = async () => {
  try {
    const response = await axios.get(`http://localhost:3001/auth/getUsers`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user details", error);
    return [];
  }
};

const PrimarySection = () => {
  const [usersData, setUsersData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      const data = await fetchUsers();
      console.log("Fetched Users: ", data); // Log fetched users for debugging
      setUsersData(data);
    };
    getUsers();
  }, []);

  const filteredUsers = usersData.filter(
    (user) =>
      allowedGrades.includes(user.grade) &&
      (user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.grade.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="section">
      <NavBar />
      <div className="section_main">
        <div className="section_img_main"></div>
        <div className="section_text_2">
          <h3>Primary Section</h3>
          <h3>Rajasinghe Central College</h3>
          <h3>Ruwanwella</h3>
          <div className="location">
            <FontAwesomeIcon icon={faLocation} />
            <h2>Vandala, Ruwanwella</h2>
          </div>
          <div className="phone">
            <FontAwesomeIcon icon={faPhone} />
            <h2>+94 112 1123 12</h2>
          </div>
        </div>
      </div>
      <div className="modal-content_2">
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
        <div className="staff_2">
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
                  <p>{user.grade}</p>
                  <p>{user.phone}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="application_1">
        <div className="application_header_1">
          Application for Grade 1 Enrollment
        </div>
        <div className="application-image_1">
          <a
            href="/Dileeban_CV.pdf"
            download="Dileeban_CV.pdf"
            className="app_image_1"
          >
            <FontAwesomeIcon icon={faDownload} />
            <h6>(click here to download)</h6>
            <div className="due_date">
              Due date: 24 June 2024
              <br />
              <span className="des">
                Fill the form and handover to school office on or before the
                deadline.
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PrimarySection;
