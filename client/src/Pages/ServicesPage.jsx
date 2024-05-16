import React from "react";
import "../styles/services.css";

const ServicesPage = () => {
  return (
    <section className="services">
      <div className="text">
        <h1>Servises</h1>
      </div>
      <div className="services-container">
        <div className="service-box box1">
          <h2>Book a Doctor Now</h2>
          <p>Find and schedule appointments with doctors online.</p>
        </div>
        <div className="service-box box2">
          <h2>Identify Your Disease</h2>
          <p>
            Learn about symptoms and conditions to help identify your disease.
          </p>
        </div>
        <div className="service-box box3">
          <h2>Find the Nearest Hospital</h2>
          <p>
            Locate hospitals near your area for immediate medical attention.
          </p>
        </div>
        <div className="service-box box4">
          <h2>Health Tips</h2>
          <p>
            Get valuable tips and advice for maintaining a healthy lifestyle.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServicesPage;
