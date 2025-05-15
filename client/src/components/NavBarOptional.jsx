import React, { useState } from "react";
import "../styles/navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import image from "../assets/logo.jpg";

import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

const NavBarOptional = ({ }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
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
      </div>
    </nav>
  );
};

export default NavBarOptional;
