import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/auth.css";
import Navbar from "../components/Navbar";

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("http://localhost:3001/auth/update", {
        name,
        email,
        password,
        phone,
        address,
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <Navbar />
      <div className="main_container">
        <form className="form" onSubmit={handleSubmit}>
          <h2 className="title">Update Profile</h2>
          <div className="form-group">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter User Name"
              autoFocus
              className="input-field"
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email "
              className="input-field"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Your Password"
              className="input-field"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter Your Phone"
              className="input-field"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter Your Address"
              className="input-field"
            />
          </div>
          <button type="submit" className="submit-btn">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
