import React, { useState } from "react";
import "../styles/auth.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [regnumber, setRegNumber] = useState("");
  const [hospital, setHospital] = useState("");
  const [specialization, setSpecialization] = useState("");

  const specializationOptions = [
    "none",
    "Eye Specialist",
    "Skin Specialist",
    "Ear Specialist",
    "Heart Specialist",
    "Liver Specialist",
    "Kidney Specialist",
    "Dentist",
    "Veterinarian",
    "Radiologist",
    "Physiotherapist"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/register", {
        username,
        email,
        password,
        phone,
        address,
        regnumber,
        hospital,
        specialization,
      });
      if (response && response.data.success) {
        toast.success("Successfully created an account!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="r_container">
      <ToastContainer position="top-right" />
      <div className="sub">
        <div className="rsub"></div>
        <div className="r_main_container">
          <div className="backtohome" onClick={handleBack}>
            Back to home
          </div>
          <form className="r_form" onSubmit={handleSubmit}>
            <h2 className="r_title">Sign Up</h2>
            <input
              className="input-field"
              type="text"
              id="username"
              name="username"
              placeholder="Enter Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              className="input-field"
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="input-field"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <input
              className="input-field"
              type="text"
              id="regnumber"
              name="regnumber"
              value={regnumber}
              onChange={(e) => setRegNumber(e.target.value)}
              placeholder="Register Num"
              required
            />
            <input
              className="input-field"
              type="text"
              id="hospital"
              name="hospital"
              value={hospital}
              onChange={(e) => setHospital(e.target.value)}
              placeholder="Hospital"
              required
            />
            <input
              className="input-field"
              type="number"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
              required
            />
            <input
              className="input-field"
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
              required
            />
            <select
              className="input-field-select"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              required
            >
              {specializationOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <button type="submit" className="submit-btn_10">
              Sign Up
            </button>
            <div className="link">
              Already have an account? <a href="/login">Login</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
