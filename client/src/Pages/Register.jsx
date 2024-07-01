import React, { useState } from "react";
import "../styles/auth.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "../components/Navbar";
import users from "../assets/users.jpg";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [position, setPosition] = useState("");
  const [sex, setSex] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null); // State to hold the image preview

  const positions = [
    "Select Position",
    "principal",
    "vice principal",
    "teacher",
    "sport coach",
  ];
  const sexes = ["Select Sex", "male", "female"];
  const grades = [
    "Select Grade",
    "grade 1",
    "grade 2",
    "grade 3",
    "grade 5",
    "grade 6",
    "grade 7",
    "grade 8",
    "grade 9",
    "grade 10",
    "grade 11",
    "A/L Science section",
    "A/L Commerce section",
    "A/L Art section",
    "A/L Technology section",
  ];
  const subjects = [
    "Select Subject",
    "O/L Maths",
    "O/L Science",
    "O/L English",
    "O/L Sinhala",
    "O/L Tamil",
    "O/L Buddhism",
    "O/L Commerce",
    "O/L Geography",
    "O/L Art",
    "O/L Music",
    "O/L Dance",
    "O/L History",
    "A/L Physics",
    "A/L Chemistry",
    "A/L Combined Maths",
    "A/L Biology",
    "A/L Accounting",
    "A/L Economics",
    "A/L Business Studies",
    "A/L Sinhala",
    "A/L Geography",
    "A/L History",
    "A/L Engineering Technology",
    "A/L Bio System Technology",
    "A/L Science For Technology",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("grade", grade);
    formData.append("position", position);
    formData.append("subject", subject);
    formData.append("sex", sex);

    try {
      const uploadResponse = await axios.post(
        "http://localhost:3001/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const imageUrl = uploadResponse.data.filePath;

      const response = await axios.post("http://localhost:3001/register", {
        username,
        email,
        password,
        phone,
        address,
        grade,
        position,
        subject,
        sex,
        image: imageUrl,
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

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.substring(0, 5) === "image") {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Set preview URL
    } else {
      setImage(null);
      setPreview(null); // Reset preview
    }
  };

  return (
    <div className="r_container">
      <ToastContainer position="top-right" />
      <NavBar />
      <div className="r_main_container">
        <form className="r_form" onSubmit={handleSubmit}>
          <h2 className="r_title">Sign Up</h2>
          <div className="signup_profile_section">
            <img src={preview || users} alt="Profile" />{" "}
            <label htmlFor="prof_image">Upload Your Image</label>
          </div>
          <input
            id="prof_image"
            className="profile-image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            name="image"
            required
          />
          <div className="input_section">
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
              type="number"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
              required
            />
          </div>
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
          <div className="input_section">
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
              id="address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
              required
            />
          </div>

          <div className="input_section">
            <select
              className="input-field-select"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
            >
              {positions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <select
              className="input-field-select"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            >
              {subjects.map((subject, index) => (
                <option key={index} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>
          <div className="input_section">
            <select
              className="input-field-select"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              required
            >
              {grades.map((grade, index) => (
                <option key={index} value={grade}>
                  {grade}
                </option>
              ))}
            </select>
            <select
              className="input-field-select"
              value={sex}
              onChange={(e) => setSex(e.target.value)}
              required
            >
              {sexes.map((sex, index) => (
                <option key={index} value={sex}>
                  {sex}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="submit-btn_10">
            Sign Up
          </button>
          <div className="link">
            Already have an account? <a href="/login">Login</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
