import React, { useState } from "react";
import "../styles/auth.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/auth/login", {
        email,
        password,
      });
      localStorage.setItem("userinfo", JSON.stringify({ email: email }));
      setTimeout(() => {
        navigate("/");
        toast.success("Successfully logged in!");
      }, 2000);
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="r_container">
      <ToastContainer />
      <div className="sub">
        <div className="rsub2"></div>
        <div className="r_main_container">
          <div className="backtohome" onClick={handleBack}>
            Back to home
          </div>
          <form className="r_form" onSubmit={handleSubmit}>
            <h2 className="r_title">Welcome Back</h2>
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
            <button type="submit" className="submit-btn_10">
              Sign In
            </button>
            <div className="link">
              Don't have an account? <a href="/register">Register</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
