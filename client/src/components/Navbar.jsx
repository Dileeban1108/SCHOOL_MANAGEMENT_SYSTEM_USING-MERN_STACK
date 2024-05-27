import React, { useState } from "react";
import "../styles/navbar.css";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt, faEdit, faHospital, faBars } from "@fortawesome/free-solid-svg-icons";
import ProfileModal from "./ProfileModal"; // Import the ProfileModal component

const NavBar = ({
  doctorhome,
  main,
  services,
  aboutus,
  reviews,
  hospitals,
  userRole,
  doctorDetails,
}) => {
  const [showProfile, setShowProfile] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  const handleLogout = () => {
    localStorage.removeItem("userinfo");
    window.location.reload();
  };

  const handleUpdateProfileClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <h1 className="logo-text">Medical App</h1>
          </div>
          <div className="hamburger" onClick={toggleMobileMenu}>
            <FontAwesomeIcon icon={faBars} />
          </div>
          <ul className={`nav-links ${showMobileMenu ? "active" : ""}`}>
            {userRole === "doctor" ? (
              <li>
                <ScrollLink to={doctorhome} smooth={true} duration={500} onClick={toggleMobileMenu}>
                  User
                </ScrollLink>
              </li>
            ) : (
              <li>
                <ScrollLink to={main} smooth={true} duration={500} onClick={toggleMobileMenu}>
                  Home
                </ScrollLink>
              </li>
            )}
            {userRole !== "doctor" && (
              <li>
                <ScrollLink to={services} smooth={true} duration={500} onClick={toggleMobileMenu}>
                  Services
                </ScrollLink>
              </li>
            )}
            <li>
              <ScrollLink to={hospitals} smooth={true} duration={500} onClick={toggleMobileMenu}>
                Hospitals
              </ScrollLink>
            </li>
            <li>
              <ScrollLink to={aboutus} smooth={true} duration={500} onClick={toggleMobileMenu}>
                About Us
              </ScrollLink>
            </li>
            <li>
              <ScrollLink to={reviews} smooth={true} duration={500} onClick={toggleMobileMenu}>
                Reviews
              </ScrollLink>
            </li>
            {userRole === "doctor" ? (
              <li className="profile-icon" onClick={toggleProfile}>
                <FontAwesomeIcon icon={faUser} />
                {showProfile && doctorDetails && (
                  <div className="profile-dropdown">
                    <div className="name-email">
                      <h3>{doctorDetails.username}</h3>
                      <h5>{doctorDetails.email}</h5>
                    </div>
                    <p>
                      <FontAwesomeIcon icon={faHospital} />{" "}
                      {doctorDetails.hospital}
                    </p>
                    <p onClick={handleUpdateProfileClick}>
                      <FontAwesomeIcon icon={faEdit} /> Update Profile
                    </p>
                    <p onClick={handleLogout}>
                      <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                    </p>
                  </div>
                )}
              </li>
            ) : (
              <li>
                <RouterLink
                  to="/bookdoctor"
                  style={{ textDecoration: "none"}}
                  onClick={toggleMobileMenu}
                >
                  Consult
                </RouterLink>
              </li>
            )}
          </ul>
        </div>
      </nav>
      <ProfileModal show={showModal} onClose={handleCloseModal} doctorDetails={doctorDetails} />
    </>
  );
};

export default NavBar;
