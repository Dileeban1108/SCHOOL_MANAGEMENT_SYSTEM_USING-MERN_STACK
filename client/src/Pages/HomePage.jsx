import React from "react";
import Navbar from "../components/Navbar";
import "../styles/homepage.css";
import Footer from "./Footer";
import MainPage from "./MainPage";
import ServicesPage from "./ServicesPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import AboutUs from "./About";
import ReviewPage from "./ReviewPage";

const HomePage = () => {
  const handleClick = (hospitalName) => {
    alert(`You clicked on ${hospitalName}`);
  };

  return (
    <section className="home">
      <Navbar
        main="main"
        hospitals="hospitals"
        services="services"
        aboutus="aboutus"
        reviews="reviews"
      />
      <MainPage id="main" />
      <div className="main-home-container" id="hospitals">
        <div className="text">
          <h1>Hospitals</h1>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search any Hospital..." />
          <button>Search</button>
        </div>
        <div className="home-container">
          <div
            className="hospital-box"
            onClick={() => handleClick("Gomez Hospital")}
          >
            <h3>National Hospital Colombo</h3>
            <div className="location-icon">
              <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: "red" }} />
              <span>Colombo</span>
              <span className="number">+94112233445</span>
            </div>
          </div>
          <div
            className="hospital-box"
            onClick={() => handleClick("Children Hospital")}
          >
            <h3>Cancer Hospital Maharagama</h3>
            <div className="location-icon">
              <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: "red" }} />
              <span>Colombo</span>
              <span className="number">+94112233445</span>
            </div>
          </div>
          <div
            className="hospital-box"
            onClick={() => handleClick("National Hospital Colombo")}
          >
            <h3>Richway Children Hospital Colombo</h3>
            <div className="location-icon">
              <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: "red" }} />
              <span>Colombo</span>
              <span className="number">+94112233445</span>
            </div>
          </div>
          <div
            className="hospital-box"
            onClick={() => handleClick("Cancer Hospital Maharagama")}
          >
            <h3>Base Hospital Ragama</h3>
            <div className="location-icon">
              <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: "red" }} />
              <span>Colombo</span>
              <span className="number">+94112233445</span>
            </div>
          </div>
          <div
            className="hospital-box"
            onClick={() => handleClick("Cancer Hospital Maharagama")}
          >
            <h3>Gomez Hospital Colombo</h3>
            <div className="location-icon">
              <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: "red" }} />
              <span>Colombo</span>
              <span className="number">+94112233445</span>
            </div>
          </div>
          <div
            className="hospital-box"
            onClick={() => handleClick("Cancer Hospital Maharagama")}
          >
            <h3>Navaloka Hospital Colombo</h3>
            <div className="location-icon">
              <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: "red" }} />
              <span>Colombo</span>
              <span className="number">+94112233445</span>
            </div>
          </div>
          <div className="view-more">
            <h3>View More</h3>
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
        </div>
      </div>
      <div className="empty"></div>
      <div className="ultracontainer">
        <ServicesPage id="services" />
        <AboutUs id="aboutus" />
        <ReviewPage id="reviews" />
        <Footer />
      </div>
    </section>
  );
};

export default HomePage;
