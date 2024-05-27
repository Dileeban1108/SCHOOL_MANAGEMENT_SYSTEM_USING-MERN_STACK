import React, { useState, useEffect } from "react";
import "../styles/mainpage.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

import image1 from "../assets/home-image1.jpg";
import image2 from "../assets/home-image2.jpg";
import image3 from "../assets/home-image3.jpg";
import image4 from "../assets/home-image4.jpg";

const MainPage = () => {
  const navigate = useNavigate();

  const images = [image1, image2, image3, image4];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const moveToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const moveToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  const handleNavigate = () => {
    navigate("/register");
  };
  useEffect(() => {
    const interval = setInterval(moveToNextImage, 3500);
    return () => clearInterval(interval);
  }, []);
  return (
    <section className="main">
      <div className="main_container">
        <div className="moving-images-container">
          <button className="move-button left" onClick={moveToPreviousImage}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <div className="image-container">
            {images.map((image, index) => (
              <img
                key={index}
                className={`img-box ${
                  index === currentImageIndex ? "active" : ""
                }`}
                style={{
                  transform: `translateX(-${currentImageIndex * 100}%)`,
                }}
                src={image}
              />
            ))}
          </div>
          <div className="doc-img-container">
            <div className="doc-img"></div>
            <div className="doctor-register">
              <h1>Are You A Doctor</h1>
              <div className="contents">
                <p>Then join with us to make a world without patients</p>
                <h3>click below to register</h3>
                <button onClick={handleNavigate}>Join</button>
              </div>
            </div>
          </div>

          <button className="move-button right" onClick={moveToNextImage}>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>

        <div className="dots-container">
          {images.map((_, index) => (
            <span
              key={index}
              className={index === currentImageIndex ? "dot active" : "dot"}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MainPage;
