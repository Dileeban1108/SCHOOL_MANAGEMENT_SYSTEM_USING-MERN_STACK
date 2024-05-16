import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../styles/auth.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashAlt,
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const Shedule = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    university: "",
    faculty: "",
    department: "",
    lecturername: "",
    subject: "",
    date: "",
    time: "",
    zoomLink: "",
  });
  const [scheduledLectures, setScheduledLectures] = useState([]);
  const [editedLecture, setEditedLecture] = useState(null);

  useEffect(() => {
    // Fetch scheduled lectures data when component mounts
    fetchScheduledLectures();
  }, []);

  const fetchScheduledLectures = async () => {
    try {
      const response = await axios.get("http://localhost:3001/auth/getshedule");
      if (response && response.data) {
        setScheduledLectures(response.data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch scheduled lectures");
    }
  };

  const handleEdit = (lecture) => {
    setEditedLecture({ ...lecture });
  };

  const handleCancelEdit = () => {
    setEditedLecture(null);
  };
  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3001/auth/updatelecture/${editedLecture._id}`,
        editedLecture
      );
      if (response && response.data.success) {
        // Update the lecture in the scheduledLectures array
        const updatedScheduledLectures = scheduledLectures.map((lecture) =>
          lecture._id === editedLecture._id ? editedLecture : lecture
        );
        setScheduledLectures(updatedScheduledLectures);
        setEditedLecture(null);
        toast.success("Lecture updated successfully");
      } else {
        toast.error("Failed to update lecture");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const handleChange = (e) => {
    // Check if editedLecture is null to prevent errors
    if (editedLecture) {
      setEditedLecture({ ...editedLecture, [e.target.name]: e.target.value });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  const universities = [
    "University Of Kelaniya",
    "University Of Peradeniya",
    "University Of Colombo",
    "University Of Sabaragamuva",
    "University Of Jafna",
    "University Of Ruhuna",
    "University Of Moratuwa",
    "University Of Sri Jayawardhanpura",
  ];
  const faculties = [
    "Faculty Of Science",
    "Faculty Of Medical",
    "Faculty Of Engineering",
    "Faculty Of Art",
    "Faculty Of Humanities",
    "Faculty Of Social Science",
    "Faculty Of Management",
  ]; // Example faculties
  const handleDelete = async (id) => {
    try {
      // Assuming you have an endpoint to delete a scheduled lecture
      const response = await axios.delete(
        `http://localhost:3001/auth/deletelecture/${id}`
      );
      if (response && response.data.success) {
        // Remove the deleted lecture from the scheduledLectures array
        const updatedScheduledLectures = scheduledLectures.filter(
          (lecture) => lecture._id !== id
        );
        setScheduledLectures(updatedScheduledLectures);
        toast.success("Lecture deleted successfully");
      } else {
        toast.error("Failed to delete lecture");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/shedule",
        formData
      );
      if (response && response.data.success) {
        console.log("success");

        navigate("/main");
      } else {
        console.log("failed");
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="container_2">
      <Navbar />
      <div className="main_container_2">
        <form className="form_2" onSubmit={handleSubmit}>
          <h2 className="title_2">Schedule A Lecture</h2>
          <select
            className="input-field_2"
            id="university"
            name="university"
            value={formData.university}
            onChange={handleChange}
            required
          >
            <option value="">Select Your University</option>
            {universities.map((university, index) => (
              <option key={index} value={university}>
                {university}
              </option>
            ))}
          </select>
          <select
            className="input-field_2"
            id="faculty"
            name="faculty"
            value={formData.faculty}
            onChange={handleChange}
            required
          >
            <option value="">Select Your Faculty</option>
            {faculties.map((faculty, index) => (
              <option key={index} value={faculty}>
                {faculty}
              </option>
            ))}
          </select>
          <input
            className="input-field_2"
            type="text"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="Department"
            required
          />
          <input
            className="input-field_2"
            type="text"
            id="lecturername"
            name="lecturername"
            value={formData.lecturername}
            onChange={handleChange}
            placeholder="Lecturer Name"
            required
          />
          <input
            className="input-field_2"
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            required
          />
          <input
            className="input-field_2"
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            placeholder="Date"
            required
          />
          <input
            className="input-field_2"
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            placeholder="Time"
            required
          />
          <input
            className="input-field_2"
            type="url"
            id="zoomlink"
            name="zoomlink"
            value={formData.zoomlink}
            onChange={handleChange}
            placeholder="Zoom Link"
            required
          />
          <button type="submit" className="submit-btn">
            Schedule
          </button>
        </form>

        <div className="scheduled-lectures">
          <h2>Scheduled Lectures</h2>
          <ul>
            {scheduledLectures.map((lecture) => (
              <li key={lecture._id}>
                {editedLecture && editedLecture._id === lecture._id ? (
                  <div className="shedule-box">
                    <div>
                      <input
                        type="text"
                        name="lecturername"
                        value={editedLecture.lecturername}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="subject"
                        value={editedLecture.subject}
                        onChange={handleChange}
                      />
                    </div>
                    <input
                      type="date"
                      name="date"
                      value={
                        editedLecture.date
                          ? editedLecture.date.split("T")[0]
                          : ""
                      }
                      onChange={handleChange}
                    />

                    <div>
                      <input
                        type="time"
                        name="time"
                        value={editedLecture.time}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="icons">
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="edit-icon"
                        onClick={handleUpdate}
                      />
                      <FontAwesomeIcon
                        icon={faTimes}
                        className="delete-icon"
                        onClick={handleCancelEdit}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="shedule-box">
                    <div>
                      <strong>Lecturer:</strong> {lecture.lecturername}
                    </div>
                    <div>
                      <strong>Subject:</strong> {lecture.subject}
                    </div>
                    <div>
                      <strong>Date:</strong>{" "}
                      {new Date(lecture.date).toLocaleDateString()}
                    </div>
                    <div>
                      <strong>Time:</strong> {lecture.time}
                    </div>
                    <div className="link">
                      <strong>Link:</strong>{" "}
                      <a
                      style={{textcoration:"none",color:"#007bff"}}
                        href={lecture.zoomlink}
                      >
                        {lecture.zoomlink}
                      </a>
                    </div>
                    <div className="icons">
                      <FontAwesomeIcon
                        icon={faEdit}
                        className="edit-icon"
                        onClick={() => handleEdit(lecture)}
                      />
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        className="delete-icon"
                        onClick={() => handleDelete(lecture._id)}
                      />
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Shedule;
