import React from "react";
import "../styles/footer.css";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { AiOutlineGoogle } from "react-icons/ai";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <section className="footer-content">
        <div className="container_1">
          <h5 className="footer__heading">Contact Us</h5>
          <ul className="icons-list">
            <h5>Email:example@gmail.com</h5>
            <h5>Phone:+94 1123 34 24</h5>
            <NavLink to="">
              <FaFacebook />
            </NavLink>
            <NavLink to="">
              <FaInstagram />
            </NavLink>
            <NavLink to="">
              <AiOutlineGoogle />
            </NavLink>
          </ul>
        </div>
        <div className="container_1">
          <h5 className="footer__heading">Links</h5>
          <ul className="list-unstyled">
            <li>
              <a href="/" className="footer__link">
                Home
              </a>
            </li>
            <li>
              <a href="aboutus" className="footer__link">
                About Us
              </a>
            </li>
            <li>
              <a href="login" className="footer__link">
                Log In
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="footer__copyright">
        &copy; {new Date().getFullYear()} All Rights Reserved!..
      </div>
    </footer>
  );
};

export default Footer;
