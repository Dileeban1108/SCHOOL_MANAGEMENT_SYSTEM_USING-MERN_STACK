import React, { useState, useEffect } from "react";
import "../styles/event.css";
import NavBar from "../components/Navbar";
import ach1 from "../assets/ach1.jpg";
import ach2 from "../assets/ach2.jpg";
import ach3 from "../assets/ach3.jpg";
import ach4 from "../assets/ach4.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Event = () => {
  const images = [ach1, ach2, ach3, ach4];
  const [userRole, setUserRole] = useState(null);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [subImageIndex, setSubImageIndex] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setMainImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change main image every 4 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [images.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSubImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change sub image every 4 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [images.length]);
  const handleDelete = async (index) => {
    let response = await axios.delete(
      `http://localhost:3001/auth/deleteAnnouncement/${index}`
    );
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
    <div className="event">
      <NavBar />
      <div className="eve_main">
        <div className="eve_sub_1">
          <div
            className="eve_img_main"
            style={{ backgroundImage: `url(${images[mainImageIndex]})` }}
          ></div>
        </div>
        <div className="eve_sub_2">
          <div
            className="eve_img_sub"
            style={{ backgroundImage: `url(${images[subImageIndex]})` }}
          >
            {userRole === "user" && (
              <div
                className="delete_icon_1"
                onClick={() => {
                  handleDelete(subImageIndex);
                }}
              >
                <FontAwesomeIcon icon={faTrash} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
