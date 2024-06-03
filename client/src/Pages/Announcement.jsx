import React, { useState, useEffect } from "react";
import "../styles/announcement.css";
import Navbar from "../components/Navbar";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import ann1 from "../assets/ann1.jpg";
import ann2 from "../assets/ann2.jpg";
import ann3 from "../assets/ann3.jpg";
import ann4 from "../assets/ann4.jpg";
import ann5 from "../assets/ann5.jpg";
import ann6 from "../assets/ann6.jpg";

const Announcement = () => {
  const images = [ann1, ann2, ann3, ann4, ann5, ann6];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [images.length]);

  const handleDelete = async (index) => {
    try {
      let response = await axios.delete(
        `http://localhost:3001/auth/deleteAnnouncement/${index}`
      );
      console.log(response.data);
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
          if (response) {
            setUserRole("user");
          } else {
            console.log("User role not found in response");
          }
        } else {
          console.log("No user info found in local storage");
        }
      } catch (error) {
        console.error("Failed to fetch user details", error);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <div className="announcement">
      <Navbar />
      <div className="ann_main">
        <div
          className="ann_img"
          style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
        ></div>
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
        {images.map((img, index) => (
          <div
            key={index}
            className="announcement_img_box"
            style={{ backgroundImage: `url(${img})` }}
          >
            {/* {userRole === "user" && ( */}
              <div
                className="delete_icon_1"
                onClick={() => handleDelete(index)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </div>
             {/* )}  */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcement;
