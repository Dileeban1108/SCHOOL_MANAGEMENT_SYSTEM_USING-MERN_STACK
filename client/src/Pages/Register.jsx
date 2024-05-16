import React, { useState } from "react";
import "../styles/auth.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState(null);
  const [address, setAddress] = useState("");
  const [regnumber, setRegNumber] = useState("");

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
      });
      if (response && response.data.success) {
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };
  const handleBack=()=>{
    navigate('/')
  }
  return (
    <div className="r_container">
      <div className="sub">
        <div className="rsub">
        </div>
        <div className="r_main_container">
        <div className="backtohome" onClick={handleBack}>Back to home</div>

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
            <button type="submit" className="submit-btn">
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
