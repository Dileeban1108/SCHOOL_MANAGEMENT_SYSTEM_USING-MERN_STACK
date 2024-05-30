import React from "react";
import "../styles/services.css";
import image1 from "../assets/primary.jpg";

const imagesData = [
  { id: 1, image: image1, description: "Description for Service 1" },
  { id: 2, image: image1, description: "Description for Service 2" },
  { id: 3, image: image1, description: "Description for Service 3" },
  // Add more images as needed
];

const ServicesPage = () => {
  return (
    <>
      <div className="services-container">
      <div className="text2">
        <h1>ACHIEVEMENTS ...</h1>
      </div>
        <div className="slider">
          {imagesData.map((img) => (
            <div key={img.id} className="slide">
              <img src={img.image} alt={`Service ${img.id}`} />
              <div className="description">{img.description}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ServicesPage;
