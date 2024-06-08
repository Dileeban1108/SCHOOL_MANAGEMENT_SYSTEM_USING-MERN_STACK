import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "../styles/homepage.css";
import Footer from "../components/Footer";
import MainPage from "./MainPage";
import ServicesPage from "./ServicesPage";
import AboutUs from "./About";
import ReviewPage from "./ReviewPage";
import Users from "./Users";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const HomePage = () => {
  const [userRole, setUserRole] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const navigate = useNavigate();

  const handleClick = (hospitalName) => {
    navigate("/primarysection");
  };
  const handleClick1 = (hospitalName) => {
    navigate("/secondarysection");
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
    <section className="home">
      
      <Navbar
        main="main"
        services="services"
        aboutus="aboutus"
        reviews="reviews"
        academics="academics"
        userRole={userRole}
        userDetails={userDetails}
      />
      <MainPage id="main" />
      <Users />

      <div className="main-home-container" id="academics">
        <div className="home-container">
          <div className="sub_1">
            <div className="sub_1_1"></div>
            <div className="sub_1_2">
              <h3>PRIMARY SECTION</h3>
              <button onClick={handleClick} className="learnmore">
                Learn More
              </button>
            </div>
          </div>
          <div className="sub_2">
            <div className="sub_2_1">
              <h3>SECONDARY SECTION</h3>
              <button className="learnmore" onClick={handleClick1}>
                Learn More
              </button>
            </div>
            <div className="sub_2_2"></div>
          </div>
        </div>
      </div>
      <div className="empty"></div>
      <div className="ultracontainer">
        <ServicesPage userRole={userRole} id="services" />
        <AboutUs id="aboutus" />
        <ReviewPage id="reviews" userRole={userRole}/>
        <Footer />
      </div>
    </section>
  );
};

export default HomePage;
