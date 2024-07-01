import React, { useState, useEffect } from "react";
import "../styles/services.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const ServicesPage = ({ userRole,userDetails }) => {
  const [announcements, setAnnouncements] = useState([]);
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

  const handleDelete = async (index) => {
    try {
      await axios.delete("http://localhost:3001/auth/deleteAnnouncement", {
        data: { index },
      });
      setAnnouncements((prevAnnouncements) =>
        prevAnnouncements.filter((announcement) => announcement._id !== index)
      );
    } catch (error) {
      console.error("Error deleting announcement:", error);
    }
  };

  return (
    <section className="services">
      <div className="services-container">
        <div className="slider">
          {announcements.map((announcement) => (
            <div key={announcement._id} className="slide">
              <div className="bac-img-container">
                <img
                  src={announcement.image}
                  alt="profile-image"
                  className="bac-img"
                />
                <div className="description">{announcement.description}</div>
                {userRole === "user" &&
                  (userDetails.position === "principal" ||
                    userDetails.position === "vice principal") && (
                    <div
                      className="delete_icon"
                      onClick={() => handleDelete(announcement._id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </div>
                  )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPage;
