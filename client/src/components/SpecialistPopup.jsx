import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/specialistPopup.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const SpecialistPopup = ({ specialist, onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    doctorname: "",
    regnumber: "",
    username: "",
    age: "",
    address: "",
    email: "",
  });

  const [doctors, setDoctors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDoctorClick = (doctor) => {
    setFormData({
      ...formData,
      doctorname: doctor.username,
      regnumber: doctor.regnumber,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/bookDoctor",
        formData
      );
      toast.success("Successfully booked the doctor, stay tuned, the doctor will contact you");
      navigate("/bookdoctor");
    } catch (error) {
      console.error("Failed to book doctor:", error);
      toast.error("Failed to book. Please check your credentials.");
    }
  };

  useEffect(() => {
    const fetchDoctorsBySpecialization = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/auth/getDoctors/${specialist.name}`
        );
        if (Array.isArray(response.data)) {
          setDoctors(response.data);
        } else if (response.data) {
          setDoctors([response.data]); // Wrap single object in array
        } else {
          setDoctors([]);
        }
      } catch (error) {
        console.error("Failed to fetch doctors by specialization:", error);
        setDoctors([]);
      }
    };

    fetchDoctorsBySpecialization();
  }, [specialist]);
  return (
    <div className="popup-overlay_2">
      <ToastContainer />
      <div className="popup-content_2">
        <div className="button-container_5">
          <h2>Book an Appointment with {specialist.name}</h2>
          <button className="close-button" onClick={onClose}>
            X
          </button>
        </div>
        <div className="popup-columns">
          <div className="doctors-list">
            <h3>Available Doctors</h3>
            <ul>
              {doctors.map((doctor) => (
                <div
                  key={doctor._id}
                  className="available-doctors"
                  onClick={() => handleDoctorClick(doctor)}
                >
                  <li>Dr. {doctor.username}</li>
                  <li>{doctor.email}</li>
                  <li>Reg.No: {doctor.regnumber}</li>
                </div>
              ))}
            </ul>
          </div>
          <div className="appointment-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="doctorname"
                  value={formData.doctorname}
                  onChange={handleChange}
                  required
                  placeholder="Doctor Name"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="regnumber"
                  value={formData.regnumber}
                  onChange={handleChange}
                  required
                  placeholder="Register Number"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  placeholder="Patient Name"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  placeholder="Age"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  placeholder="Address"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Email (message will be sent to this email)"
                />
              </div>
              <button className="submit-btn_2" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialistPopup;
