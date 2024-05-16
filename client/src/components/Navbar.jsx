import React from "react";
import "../styles/navbar.css";
import { Link } from "react-scroll";

const NavBar = ({ main,services, aboutus, reviews, hospitals }) => {
  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <h1 className="logo-text">Medical App</h1>
        </div>
        <ul className="nav-links">
          <li>
            <Link to={main} smooth={true} duration={500}>
              Home
            </Link>
          </li>
          <li>
            <Link to={services} smooth={true} duration={500}>
              Services
            </Link>
          </li>
          <li>
            <Link to={hospitals} smooth={true} duration={500}>
              Hospitals
            </Link>
          </li>
          <li>
            <Link to={aboutus} smooth={true} duration={500}>
              About Us
            </Link>
          </li>
          <li>
            <Link to={reviews} smooth={true} duration={500}>
              Reviews
            </Link>
          </li>
          <li >
            <Link to={""} smooth={true} duration={500}>
              Consult
            </Link>
          </li>
        </ul>
      </nav>
      <hr />
    </>
  );
};

export default NavBar;
