import React, { useState, useEffect } from "react";
import "../styles/announcement.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import NavBarOptional from "../components/NavBarOptional";

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [userRole, setUserRole] = useState("");
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/auth/getAnnouncements"
        );
        if (response.data) {
          // Correct the image paths to use forward slashes
          const formattedAnnouncements = response.data.map((announcement) => ({
            ...announcement,
            image: announcement.image.replace(/\\/g, "/"),
          }));
          console.log("colle", formattedAnnouncements); // Log the formatted response data
          setAnnouncements(formattedAnnouncements);
        }
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchAnnouncements();
  }, []);

  useEffect(() => {
    if (announcements.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex(
          (prevIndex) => (prevIndex + 1) % announcements.length
        );
      }, 4000); // Change image every 4 seconds

      return () => clearInterval(interval); // Cleanup interval on component unmount
    }
  }, [announcements.length]);

  const handleDelete = async (index) => {
    try {
      const announcement = announcements[index];
      await axios.delete("http://localhost:3001/auth/deleteAnnouncement", {
        data: { id: announcement._id }, // Ensure correct key is used
      });
      setAnnouncements(announcements.filter((_, i) => i !== index));
    } catch (error) {
      console.error("There was an error deleting the announcement!", error);
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userinfo = JSON.parse(localStorage.getItem("userinfo"));
        if (userinfo && userinfo.email) {
          const email = userinfo.email;
          let response = await axios.get(
            `http://localhost:3001/auth/getUser/${email}`
          );
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
          <div className="ann_img">
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
            {userRole === "user" &&
              userDetails.position === "media team" && (
                <div
                  className="delete_icon_2"
                  onClick={() => handleDelete(index)}
                >
                  delete{" "}
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
