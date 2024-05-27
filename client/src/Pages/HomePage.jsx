import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "../styles/homepage.css";
import Footer from "../components/Footer";
import MainPage from "./MainPage";
import ServicesPage from "./ServicesPage";
import AboutUs from "./About";
import ReviewPage from "./ReviewPage";
import HospitalListModal from "../components/HospitalListModel"; // Ensure the correct path
import DoctorHome from "./DoctorHome";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const HomePage = () => {
  const [showAllHospitals, setShowAllHospitals] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [doctorDetails, setDoctorDetails] = useState({});
  const [hospitalsData, setHospitalsData] = useState([]);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const result = await axios.get("http://localhost:3001/auth/getHospitals");
        setHospitalsData(result.data);
      } catch (error) {
        console.error("Failed to fetch hospitals:", error);
      }
    };

    const fetchDoctorDetails = async () => {
      try {
        const userinfo = JSON.parse(localStorage.getItem("userinfo"));
        const email = userinfo?.email;
        if (email) {
          const response = await axios.get(`http://localhost:3001/auth/getDoctor/${email}`);
          setDoctorDetails(response.data);
          setUserRole("doctor");
        }
      } catch (error) {
        console.error("Failed to fetch doctor details", error);
      }
    };

    fetchHospitals();
    fetchDoctorDetails();
  }, []);

  const handleClick = (hospitalName) => {
    alert(`You clicked on ${hospitalName}`);
  };

  const handleViewMore = () => {
    setShowAllHospitals(!showAllHospitals);
  };

  return (
    <section className="home">
      <Navbar
        doctorhome="doctor-home"
        main="main"
        services="services"
        aboutus="aboutus"
        reviews="reviews"
        hospitals="hospitals"
        userRole={userRole}
        doctorDetails={doctorDetails}
      />
      {userRole === "doctor" ? (
        <DoctorHome setUserRole={setUserRole} id="doctor-home" />
      ) : (
        <MainPage id="main" />
      )}
      <div className="main-home-container" id="hospitals">
        <div className="text">
          <h1>Hospitals</h1>
        </div>
      
        <div className="home-container">
          {hospitalsData.slice(0, 7).map((hospital, index) => (
            <div
              key={index}
              className="hospital-box"
              onClick={() => handleClick(hospital.hospitalname)}
            >
              <h3>{hospital.hospitalname}</h3>
              <div className="location-icon">
                <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: "red" }} />
                <span>{hospital.address}</span>
              </div>
            </div>
          ))}
          <div className="view-more" onClick={handleViewMore}>
            <h3>View More</h3>
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
        </div>
      </div>
      {showAllHospitals && (
        <HospitalListModal hospitals={hospitalsData} onClose={handleViewMore} />
      )}
      <div className="empty"></div>
      <div className="ultracontainer">
        {userRole !== "doctor" && <ServicesPage id="services" />}
        <AboutUs id="aboutus" />
        <ReviewPage id="reviews" />
        <Footer />
      </div>
    </section>
  );
};

export default HomePage;
