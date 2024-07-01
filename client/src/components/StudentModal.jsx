import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/studentModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import userPlaceholderImage from "../assets/users.jpg";
import ShowStudentModal from "./ShowStudentModal";
import AddStudentModal from "./AddStudentModal";

const StudentModal = ({ show, onClose }) => {
  const [usersData, setUsersData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/auth/getStudents`
        );
        setUsersData(response.data);
      } catch (error) {
        console.error("Failed to fetch user details", error);
      }
    };

    if (show) {
      fetchUsers();
    }
  }, [show]);

  if (!show) {
    return null;
  }

  const handleAddStudentModalClick = () => {
    setShowAddStudentModal(true);
  };

  const handleShowStudentModalClick = (user) => {
    setSelectedStudent(user);
    setShowStudentModal(true);
  };

  const handleCloseAddStudentModal = () => {
    setShowAddStudentModal(false);
  };

  const handleCloseStudentModal = () => {
    setShowStudentModal(false);
    setSelectedStudent(null);
  };

  const handleAddStudent = (newStudent) => {
    setUsersData((prevData) => [...prevData, newStudent]);
  };

  const handleDeleteStudent = (deletedId) => {
    setUsersData((prevData) =>
      prevData.filter((student) => student._id !== deletedId)
    );
  };

  const filteredStudents = usersData.filter((student) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      student.username.toLowerCase().includes(searchLower)
    );
  });

  return (
    <>
      <div className="modal-overlay_3">
        <button onClick={onClose} className="cancel-btn">
          X
        </button>
        <div className="modal-content_st">
          <h2 className="staff_header">Students</h2>
          <div className="addstudents" onClick={handleAddStudentModalClick}>
            Add Students <FontAwesomeIcon icon={faPlus} />
          </div>
          <div className="searchinput2">
            <input
              type="text"
              placeholder="Search Student Name or Enrollment Number"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="student">
            {filteredStudents.map((user) => (
              <div
                key={user._id}
                className="user_box_3"
                onClick={() => handleShowStudentModalClick(user)}
              >
                <img
                  src={user.image || userPlaceholderImage}
                  alt={user.username}
                />
                <h2>{user.username}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ShowStudentModal
        show={showStudentModal}
        onClose={handleCloseStudentModal}
        student={selectedStudent}
        onDeleteStudent={handleDeleteStudent}
      />
      <AddStudentModal
        show={showAddStudentModal}
        onClose={handleCloseAddStudentModal}
        onAddStudent={handleAddStudent}
      />
    </>
  );
};

export default StudentModal;
