import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/showStudentModal.css";
import users from "../assets/users.jpg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const ShowStudentModal = ({ show, onClose, student, onDeleteStudent}) => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(users);

  const [formData, setFormData] = useState({
    username: "",
    enrolNumber: "",
    phone: "",
    enrolDate: "",
    idNumber: "",
  });

  const [confirmAction, setConfirmAction] = useState(null);

  useEffect(() => {
    if (student) {
      setFormData({
        username: student.username,
        enrolNumber: student.enrolNumber,
        enrolDate: student.enrolDate,
        idNumber: student.idNumber,
        phone: student.phone,
      });
      setImagePreview(student.image || users);
    }
  }, [student]);

  if (!show || !student) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.substring(0, 5) === "image") {
      setProfileImage(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      toast.error("Please select a valid image file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setConfirmAction(() => async () => {

      try {
        let imageUrl = student.image || ""; // Default to existing image URL

        // Upload image if profileImage is not null
        if (profileImage) {
          const imageData = new FormData();
          imageData.append("image", profileImage);
          const uploadResponse = await axios.post(
            "http://localhost:3001/upload",
            imageData
          );
          imageUrl = uploadResponse.data.filePath;
        }

        // Prepare data to update
        const updatedData = {
          username: formData.username,
          phone: formData.phone,
          enrolNumber: formData.enrolNumber,
          idNumber: formData.idNumber,
          enrolDate: formData.enrolDate,
          image: imageUrl,
        };

        // Update user profile only if any field has been updated
        const hasChanged = Object.keys(updatedData).some(
          (key) => updatedData[key] !== student[key]
        );

        if (hasChanged || imageUrl !== student.image) {
          const updateResponse = await axios.put(
            `http://localhost:3001/register/updateStudent/${student._id}`,
            updatedData
          );

          toast.success("Successfully updated!");
          setTimeout(() => {
            onClose(); // Close the modal
            window.location.reload();
          }, 1000);

          console.log(updateResponse.data); // Handle the response as needed
        } else {
          toast.info("No changes to update.");
        }
      } catch (error) {
        toast.error("Error updating profile");
        console.error("Error updating profile:", error);
      }
    })
  };

  const handleDelete = (id) => {
    setConfirmAction(() => async () => {
      try {
        await axios.delete(`http://localhost:3001/auth/deleteStudent/${id}`);
        onDeleteStudent(id);
        onClose();
        toast.success("Student deleted successfully");
      } catch (error) {
        console.error("Error deleting student:", error);
        toast.error("Failed to delete student");
      } finally {
        setConfirmAction(null);
      }
    });
  };

  const handleConfirm = async () => {
    if (confirmAction) {
      await confirmAction();
    }
  };

  const handleCancel = () => {
    setConfirmAction(null);
  };

  return (
    <>
      <ToastContainer />

        <div className="modal-overlay_3">
          <div className="modal-content_3">

            <button onClick={onClose} className="close-btn_3">
              X
            </button>
            <h2>Student Details</h2>
            <form className="student-details" onSubmit={handleSubmit}>
              <div className="update_profile_section">
                <img src={imagePreview} alt="profile" />
                <label htmlFor="prof_image">
                  <FontAwesomeIcon icon={faCamera} />
                </label>
              </div>
              <input
                id="prof_image"
                className="profile-image"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                name="image"
              />
              <div className="stu_details">
                <label>
                  <strong>Name:</strong>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  <strong>Enroll Number:</strong>
                  <input
                    type="text"
                    name="enrolNumber"
                    value={formData.enrolNumber}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  <strong>Enrollment Date:</strong>
                  <input
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    type="date"
                    name="enrolDate"
                    value={formData.enrolDate}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  <strong>ID Number:</strong>
                  <input
                    type="text"
                    name="idNumber"
                    value={formData.idNumber}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  <strong>Contact Number:</strong>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </label>
                <div className="deleteupdate_btn">
                  <button
                    type="button"
                    className="delete_btn"
                    onClick={() => handleDelete(student._id)}
                  >
                    Delete
                  </button>
                  <button type="submit" className="edit-btn">
                    Update
                  </button>
                </div>
              </div>
            </form>
            {confirmAction && (
              <div className="confirmation-box">
                <p>Are you sure you want to proceed?</p>
                <div className="cancelconfirm_btn">
                  <button onClick={handleCancel} className="cancel-btn_2">
                    Cancel
                  </button>
                  <button onClick={handleConfirm} className="confirm-btn_2">
                    Confirm
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
    </>
  );
};

export default ShowStudentModal;
