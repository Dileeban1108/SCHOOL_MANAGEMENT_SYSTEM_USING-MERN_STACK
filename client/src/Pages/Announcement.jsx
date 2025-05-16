import React, { useState, useEffect } from "react";
import "../styles/announcement.css";
import axios from "axios";
import NavBarOptional from "../components/NavBarOptional";

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [userRole, setUserRole] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const [isHovered, setIsHovered] = useState(false);
  const [menuOpenIndex, setMenuOpenIndex] = useState(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get("http://localhost:3001/auth/getAnnouncements");
        if (response.data) {
          const formattedAnnouncements = response.data.map((announcement) => ({
            ...announcement,
            image: announcement.image.replace(/\\/g, "/"),
          }));
          setAnnouncements(formattedAnnouncements);
        }
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchAnnouncements();
  }, []);

  useEffect(() => {
    if (announcements.length > 0 && !isHovered) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % announcements.length);
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [announcements.length, isHovered]);

  const handleDelete = async (index) => {
    try {
      const announcement = announcements[index];
      await axios.delete("http://localhost:3001/auth/deleteAnnouncement", {
        data: { id: announcement._id },
      });
      setAnnouncements(announcements.filter((_, i) => i !== index));
      setMenuOpenIndex(null); // close menu after delete
    } catch (error) {
      console.error("There was an error deleting the announcement!", error);
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userinfo = JSON.parse(localStorage.getItem("userinfo"));
        if (userinfo?.email) {
          const response = await axios.get(`http://localhost:3001/auth/getUser/${userinfo.email}`);
          if (response.data) {
            setUserRole("user");
            setUserDetails(response.data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch user details", error);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <div className="announcement">
      <NavBarOptional />
      <div className="ann_main">
        {announcements.length > 0 && (
          <div
            className="ann_img"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img
              src={announcements[currentImageIndex].image}
              alt="Announcement"
            />
          </div>
        )}
        <div className="ann_sub_2">
          <span>N</span>
          <span>E</span>
          <span>W</span>
        </div>
      </div>
      <div className="ann_text">
        <div className="ann_sub_3">ANNOUNCEMENTS</div>
      </div>
      <div className="all_announcements">
        {announcements.map((announcement, index) => (
          <div key={index} className="announcement_img_box">
            {userRole === "user" && userDetails.position === "media team" && (
              <div className="menu_container">
                <div
                  className="menu_icon"
                  onClick={() =>
                    setMenuOpenIndex(menuOpenIndex === index ? null : index)
                  }
                >
                  &#8942;
                </div>
                {menuOpenIndex === index && (
                  <div className="menu_dropdown">
                    <div onClick={() => handleDelete(index)}>Delete</div>
                  </div>
                )}
              </div>
            )}
            <img src={announcement.image} alt="Announcement" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcement;
