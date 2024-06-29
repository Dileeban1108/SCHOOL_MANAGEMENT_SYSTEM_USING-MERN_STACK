import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"; 

const AddNewEventModal = ({ show, onClose, userDetails }) => {
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("description", description);


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

      const response = await axios.post("http://localhost:3001/auth/createEvent", {
        description,
        image: imageUrl,
      });

      if (response && response.data.success) {
        toast.success("Successfully created an Announcement!");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };
  if (!show) {
    return null;
  }
  return (
    <div className="modal-overlay">
      <ToastContainer position="top-right" />
      <button className="cancel_button_2" onClick={onClose}>
        X
      </button>
      <div className="modal-content_6">
        <h2>Add New Event</h2>
        <form onSubmit={handleSubmit}>
        <div className="inputs">
          <input
            type="file"
            accept="/image/"
            onChange={(event) => {
              const file = event.target.files[0];
              if (file && file.type.substring(0, 5) === "image") {
                setImage(file);
              } else {
                setImage(null);
              }
            }}
            name="image"
            required
          />
          </div>
          <div className="inputs">
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewEventModal;
