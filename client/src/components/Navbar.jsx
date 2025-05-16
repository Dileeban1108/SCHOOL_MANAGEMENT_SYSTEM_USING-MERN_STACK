import React, { useState, useEffect } from "react";
import "../styles/navbar.css";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import user from "../assets/users.jpg";
import axios from "axios";
import {
  faSignOutAlt,
  faEdit,
  faBars,
  faChevronDown,
  faChevronRight,
  faEnvelope,
  faPhone,
  faPlus,
  faM,
  faMessage,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import ProfileModal from "./ProfileModal";
import PrimaryStaffModal from "./PrimaryStaffModal";
import Secondary_1StaffModal from "./Secondary_1StaffModal";
import StudentModal from "./StudentModal";
import Secondary_2StaffModal from "./Secondary_2StaffModal.jsx";
import EventModal from "./AddNewEventModal";
import AnnouncementModal from "./AddNewAnnouncementModal";
import AchievementModal from "./AddNewAchievementModal";
import LogModal from "./LogModal";
import AllLogsModal from "./AllLogsModal";
import image from "../assets/logo.jpg";
import MessageViewModal from "./MessageViewModal.jsx";
import AddApplicationForm from "./AddApplicationForm.jsx";
const NavBar = ({
  main,
  services,
  aboutus,
  academics,
  userRole,
  userDetails,
}) => {
  const [showProfile, setShowProfile] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showAllLogsModal, setShowAllLogsModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showAchievementModal, setShowAchievementModal] = useState(false);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showPrimaryStaffModal, setShowPrimaryStaffModal] = useState(false);
  const [showSecondary_1StaffModal, setShowSecondary_1StaffModal] = useState(false);
  const [showSecondary_2StaffModal, setShowSecondary_2StaffModal] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showLogModal, setShowLogModal] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [messages, setMessages] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!userDetails.email) return;

      try {
        const res = await axios.get(`http://localhost:3001/auth/getMessagesByRecieverEmail/${userDetails.email}`);
        setMessageCount(res.data.length);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    fetchMessages();
  }, [userDetails.email]);

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
  const handleAllLogsClick = () => {
    setShowAllLogsModal(true)
  }
  const handleAddEventClick = () => {
    setShowEventModal(true);
  };

  const handleAddAchievementClick = () => {
    setShowAchievementModal(true);
  };

  const handleAddAnnouncementClick = () => {
    setShowAnnouncementModal(true);
  };
  const handleAddApplicationsClick = () => {
    setShowApplicationModal(true);
  }
  const handlePrimaryModalClick = () => {
    setShowPrimaryStaffModal(true);
  };

  const handleSecondary_1ModalClick = () => {
    setShowSecondary_1StaffModal(true);
  };

  const handleSecondary_2ModalClick = () => {
    setShowSecondary_2StaffModal(true);
  };
  const handleStudentModalClick = () => {
    setShowStudentModal(true);
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
  const handleCloseApplicationsClick = () => {
    setShowApplicationModal(false)
  }

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
  const handleStudentModalClose = () => {
    setShowStudentModal(false);
  };

  const handleSecondary_2StaffModalClose = () => {
    setShowSecondary_2StaffModal(false);
  };

  const handleLogModalClick = () => {
    setShowLogModal(true);
  };

  const handleCloseLogModal = () => {
    setShowLogModal(false);
  };

  const handleCloseAllLogsModal = () => {
    setShowAllLogsModal(false)
  }
  const handleCloseMessageViewModal = () => {
    setShowModal(false);
  };
  const handleModalClick = () => {
    setShowModal(true);
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
          {userRole === "user" && (
            <div className="profile-icon" onClick={toggleProfile}>
              <img
                src={userDetails.image || user}
                alt="profile"
                className="profile_img"
              />
              {showProfile && (
                <div className="profile-dropdown">
                  <div className="name-email">
                    <h3>Hello {userDetails.username}</h3>
                  </div>
                  {userDetails.position === "principal" &&
                    <p onClick={handleAllLogsClick}>
                      View All Time Logs <FontAwesomeIcon icon={faArrowRight} />
                    </p>
                  }
                  <p onClick={handleUpdateProfileClick}>
                    Update Profile
                    <FontAwesomeIcon icon={faEdit} />
                  </p>
                  {userDetails.position === "media team" && (
                    <>
                      <p onClick={handleAddEventClick}>
                        Add New Event <FontAwesomeIcon icon={faPlus} />
                      </p>
                      <p onClick={handleAddAchievementClick}>
                        Add New Achievement <FontAwesomeIcon icon={faPlus} />
                      </p>
                      <p onClick={handleAddAnnouncementClick}>
                        Add New Announcement <FontAwesomeIcon icon={faPlus} />
                      </p>
                    </>
                  )}
                  {userDetails.position === "  office staff" && (
                    <p onClick={handleAddApplicationsClick}>
                      Add Applications <FontAwesomeIcon icon={faPlus} />
                    </p>
                  )}
                  <p onClick={handleLogout}>
                    Logout
                    <FontAwesomeIcon icon={faSignOutAlt} />
                  </p>
                </div>
              )}
            </div>
          )}
          <div className="logo" onClick={handleClick}>
            <img src={image} alt="logo" />
          </div>
          <div className="hamburger" onClick={toggleMobileMenu}>
            <FontAwesomeIcon icon={faBars} />
          </div>
          <ul className={`nav-links ${showMobileMenu ? "active" : ""}`} >
            {userRole === "user" && (
              <li>
                <ScrollLink
                  style={{ textDecoration: "none" }}
                  onClick={handleStudentModalClick}
                >
                  Students
                </ScrollLink>
              </li>
            )}
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
                  {userRole !== "user" && (
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
                    Primary <FontAwesomeIcon icon={faChevronRight} />
                    <div className="submenu"></div>
                  </RouterLink>
                  <RouterLink
                    to="/secondary_application"
                    style={{ textDecoration: "none" }}
                  >
                    Secondary <FontAwesomeIcon icon={faChevronRight} />
                    <div className="submenu"></div>
                  </RouterLink>
                </div>
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



            {userRole === "user" && (
              <>
                <li className="icon-container" onClick={handleModalClick}
                >
                  <FontAwesomeIcon icon={faMessage} />
                  {messageCount > 0 && (
                    <span className="badge">{messageCount}</span>
                  )}

                </li>
                <li>
                  <RouterLink
                    style={{ textDecoration: "none" }}
                    className="students-btn"
                    onClick={handleLogModalClick}
                  >
                    Log
                  </RouterLink>
                </li>

              </>
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
      <StudentModal show={showStudentModal} onClose={handleStudentModalClose} />
      <Secondary_2StaffModal
        show={showSecondary_2StaffModal}
        onClose={handleSecondary_2StaffModalClose}
      />

      <EventModal show={showEventModal} onClose={handleCloseEventModal} />
      <AnnouncementModal
        show={showAnnouncementModal}
        onClose={handleCloseAnnouncementModal}
      />
      <AddApplicationForm
        show={showApplicationModal}
        onClose={handleCloseApplicationsClick}
      />
      <AchievementModal
        show={showAchievementModal}
        onClose={handleCloseAchievementModal}
      />
      <LogModal
        show={showLogModal}
        onClose={handleCloseLogModal}
        userDetails={userDetails}
      />
      <AllLogsModal
        show={showAllLogsModal}
        onClose={handleCloseAllLogsModal}
        userDetails={userDetails}
      />
      <MessageViewModal show={showModal} messages={messages} onClose={handleCloseMessageViewModal} userDetails={userDetails}
      />

    </>
  );
};

export default NavBar;
