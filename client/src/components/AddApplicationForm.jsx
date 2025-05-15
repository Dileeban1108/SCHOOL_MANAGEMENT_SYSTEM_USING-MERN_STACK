import React, { useState } from "react";
import "../styles/application.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AddApplicationForm = ({ show, onClose }) => {
  const navigate = useNavigate();
  const [fileType, setFileType] = useState("primary");
  const [deadLine, setDeadLine] = useState("");
  const [pdfFile, setPdfFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pdfFile || !deadLine || !fileType) {
      toast.error("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("file", pdfFile);

    try {
      // Upload PDF
      const uploadResponse = await axios.post("http://localhost:3001/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const filePath = uploadResponse.data.filePath;

      // Save application
      const response = await axios.post("http://localhost:3001/auth/addApplication", {
        deadLine,
        file: filePath,
        fileType,
      });

      if (response.data.success) {
        toast.success("Application added successfully!");
        setTimeout(() => {
          onClose(); // close modal
          window.location.reload(); // reload page or use navigate
        }, 1000);
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    }
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <ToastContainer position="top-right" />
      <button className="cancel_button_2" onClick={onClose}>X</button>
      <div className="modal-content_6">
        <h2>Add New Application</h2>
        <form onSubmit={handleSubmit}>
          <div className="inputs">
            <label>Application Type</label>
            <select value={fileType} onChange={(e) => setFileType(e.target.value)} required>
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
            </select>
          </div>

          <div className="inputs">
            <label>Deadline</label>
            <input
              type="date"
              value={deadLine}
              onChange={(e) => setDeadLine(e.target.value)}
              required
            />
          </div>

          <div className="inputs">
            <label>Upload PDF</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setPdfFile(e.target.files[0])}
              required
            />
          </div>

          <button type="submit" className="submit" style={{ width: "90%" }}>
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddApplicationForm;
