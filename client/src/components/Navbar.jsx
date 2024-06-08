import React, { useState } from "react";
import "../styles/navbar.css";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faEdit,
  faBars,
  faChevronDown,
  faChevronRight,
  faEnvelope,
  faPhone,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import ProfileModal from "./ProfileModal";
import PrimaryStaffModal from "./PrimaryStaffModal";
import Secondary_1StaffModal from "./Secondary_1StaffModal";
import Secondary_2StaffModal from "./Secondary_2StaffModal.jsx";
import EventModal from "./AddNewEventModal";
import AnnouncementModal from "./AddNewAnnouncementModal";
import AchievementModal from "./AddNewAchievementModal";
import image from "../assets/logo.jpg";
import user from "../assets/users.jpg";

const NavBar = ({
  main,
  services,
  aboutus,
  reviews,
  academics,
  userRole,
  userDetails,
}) => {
  const [showProfile, setShowProfile] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showAchievementModal, setShowAchievementModal] = useState(false);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showPrimaryStaffModal, setShowPrimaryStaffModal] = useState(false);
  const [showSecondary_1StaffModal, setShowSecondary_1StaffModal] =
    useState(false);
  const [showSecondary_2StaffModal, setShowSecondary_2StaffModal] =
    useState(false);
  const navigate = useNavigate();

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  const handleLogout = () => {
    localStorage.removeItem("userinfo");
    window.location.reload();
  };

  const handleUpdateProfileClick = () => {
    setShowProfileModal(true);
  };

  const handleAddEventClick = () => {
    setShowEventModal(true);
  };

  const handleAddAchievementClick = () => {
    setShowAchievementModal(true);
  };

  const handleAddAnnouncementClick = () => {
    setShowAnnouncementModal(true);
  };

  const handlePrimaryModalClick = () => {
    setShowPrimaryStaffModal(true);
  };

  const handleSecondary_1ModalClick = () => {
    setShowSecondary_1StaffModal(true);
  };

  const handleSecondary_2ModalClick = () => {
    setShowSecondary_2StaffModal(true);
  };

  const handleCloseProfileModal = () => {
    setShowProfileModal(false);
  };

  const handleCloseEventModal = () => {
    setShowEventModal(false);
  };

  const handleCloseAchievementModal = () => {
    setShowAchievementModal(false);
  };

  const handleCloseAnnouncementModal = () => {
    setShowAnnouncementModal(false);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const handleClick = () => {
    navigate("/");
  };

  const handlePrimaryStaffModalClose = () => {
    setShowPrimaryStaffModal(false);
  };

  const handleSecondary_1StaffModalClose = () => {
    setShowSecondary_1StaffModal(false);
  };

  const handleSecondary_2StaffModalClose = () => {
    setShowSecondary_2StaffModal(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="rcc-container">
          <div className="contact-info">
            <FontAwesomeIcon icon={faPhone} /> : +123-456-7890
          </div>
          <div className="rcc-name">
            <h1>RAJASINGHE CENTRAL COLLEGE - RUWANWELLA</h1>
          </div>
          <div className="contact-info">
            <FontAwesomeIcon icon={faEnvelope} /> : email@example.com
          </div>
        </div>
        <div className="nav-container">
          <div className="logo" onClick={handleClick}>
            <img src={image} alt="logo" />
          </div>
          <div className="hamburger" onClick={toggleMobileMenu}>
            <FontAwesomeIcon icon={faBars} />
          </div>
          <ul className={`nav-links ${showMobileMenu ? "active" : ""}`}>
              <li>
                <ScrollLink
                  to={main}
                  smooth={true}
                  duration={500}
                  onClick={toggleMobileMenu}
                >
                  Home
                </ScrollLink>
              </li>
            <li>
              <ScrollLink
                smooth={true}
                duration={500}
                onClick={toggleMobileMenu}
              >
                Staff <FontAwesomeIcon icon={faChevronDown} />
                <div className="dropdown">
                  <RouterLink
                    to="#"
                    style={{ textDecoration: "none" }}
                    onClick={handlePrimaryModalClick}
                  >
                    Primary <FontAwesomeIcon icon={faChevronRight} />
                    <div className="submenu"></div>
                  </RouterLink>
                  <RouterLink
                    to="#"
                    style={{ textDecoration: "none" }}
                    onClick={handleSecondary_1ModalClick}
                  >
                    Grade 6-11 <FontAwesomeIcon icon={faChevronRight} />
                    <div className="submenu"></div>
                  </RouterLink>
                  <RouterLink
                    to="#"
                    style={{ textDecoration: "none" }}
                    onClick={handleSecondary_2ModalClick}
                  >
                    A/L Section <FontAwesomeIcon icon={faChevronRight} />
                    <div className="submenu"></div>
                  </RouterLink>
                  {userRole !=="user" && (
                  <RouterLink
                    to="/login"
                    style={{
                      textDecoration: "none",
                      color: "white",
                      backgroundColor: "#007bff",
                      borderRadius: "10px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                    onClick={toggleMobileMenu}
                  >
                    LogIn
                  </RouterLink>
                  )}
                </div>
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                smooth={true}
                duration={500}
                onClick={toggleMobileMenu}
              >
                Applications <FontAwesomeIcon icon={faChevronDown} />
                <div className="dropdown">
                  <RouterLink
                    to="/primary_application"
                    style={{ textDecoration: "none" }}
                  >
                    Grade 1 <FontAwesomeIcon icon={faChevronRight} />
                    <div className="submenu"></div>
                  </RouterLink>
                  <RouterLink
                    to="/secondary1_application"
                    style={{ textDecoration: "none" }}
                  >
                    Grade 6 <FontAwesomeIcon icon={faChevronRight} />
                    <div className="submenu"></div>
                  </RouterLink>
                  <RouterLink
                    to="/secondary2_application"
                    style={{ textDecoration: "none" }}
                  >
                    Advanced Level
                    <FontAwesomeIcon icon={faChevronRight} />
                    <div className="submenu"></div>
                  </RouterLink>
                </div>
              </ScrollLink>
            </li>

            <li>
              <ScrollLink
                to={academics}
                smooth={true}
                duration={500}
                onClick={toggleMobileMenu}
              >
                Academic
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                to={services}
                smooth={true}
                duration={500}
                onClick={toggleMobileMenu}
              >
                Achievements
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                smooth={true}
                duration={500}
                onClick={toggleMobileMenu}
              >
                Get In Touch <FontAwesomeIcon icon={faChevronDown} />
                <div className="dropdown">
                  <RouterLink
                    to="/announcement"
                    style={{ textDecoration: "none" }}
                  >
                    Announcements
                    <FontAwesomeIcon icon={faChevronRight} />
                    <div className="submenu"></div>
                  </RouterLink>
                  <RouterLink to="/event" style={{ textDecoration: "none" }}>
                    Events
                    <FontAwesomeIcon icon={faChevronRight} />
                    <div className="submenu"></div>
                  </RouterLink>
                </div>
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                to={aboutus}
                smooth={true}
                duration={500}
                onClick={toggleMobileMenu}
              >
                About Us
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                to={reviews}
                smooth={true}
                duration={500}
                onClick={toggleMobileMenu}
              >
                Reviews
              </ScrollLink>
            </li>
            {userRole === "user" && (
              <li className="profile-icon" onClick={toggleProfile}>
                <img
                  src={userDetails.image}
                  alt="profile"
                  className="profile_img"
                />
                {showProfile && (
                  <div className="profile-dropdown">
                    <div className="name-email">
                      <h3>{userDetails.username}</h3>
                      <h5>{userDetails.email}</h5>
                    </div>
                    <p onClick={handleUpdateProfileClick}>
                      Update Profile
                      <FontAwesomeIcon icon={faEdit} />
                    </p>
                    <p onClick={handleAddEventClick}>
                      Add New Event <FontAwesomeIcon icon={faPlus} />
                    </p>
                    <p onClick={handleAddAchievementClick}>
                      Add New Achievement <FontAwesomeIcon icon={faPlus} />
                    </p>
                    <p onClick={handleAddAnnouncementClick}>
                      Add New Announcement <FontAwesomeIcon icon={faPlus} />
                    </p>
                    <p onClick={handleLogout}>
                      Logout
                      <FontAwesomeIcon icon={faSignOutAlt} />
                    </p>
                  </div>
                )}
              </li>
            )}
          </ul>
        </div>
      </nav>
      <ProfileModal
        show={showProfileModal}
        onClose={handleCloseProfileModal}
        userDetails={userDetails}
      />
      <PrimaryStaffModal
        show={showPrimaryStaffModal}
        onClose={handlePrimaryStaffModalClose}
      />
      <Secondary_1StaffModal
        show={showSecondary_1StaffModal}
        onClose={handleSecondary_1StaffModalClose}
      />
      <Secondary_2StaffModal
        show={showSecondary_2StaffModal}
        onClose={handleSecondary_2StaffModalClose}
      />

      <EventModal show={showEventModal} onClose={handleCloseEventModal} />
      <AnnouncementModal
        show={showAnnouncementModal}
        onClose={handleCloseAnnouncementModal}
      />
      <AchievementModal
        show={showAchievementModal}
        onClose={handleCloseAchievementModal}
      />
    </>
  );
};

export default NavBar;
