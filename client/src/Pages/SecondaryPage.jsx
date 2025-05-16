import React, { useEffect, useState } from "react";
import "../styles/application.css";
import NavBar from "../components/NavBarOptional";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const SecondaryPage = () => {
  const [fileData, setFileData] = useState(null);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/auth/getApplication/secondary"
        );
        setFileData(response.data);
      } catch (error) {
        console.error("Error fetching application:", error);
      }
    };

    fetchApplication();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete("http://localhost:3001/auth/deleteApplication/secondary");
      setFileData(null);
      toast.success("Application deleted successfully.");
    } catch (error) {
      console.error("Error deleting application:", error);
      toast.error("Failed to delete application.");
    }
  };

  const isDeadlineOver = fileData
    ? moment().isAfter(moment(fileData.deadLine), "day")
    : false;

  return (
    <div className="application_container">
      <NavBar />
      <ToastContainer position="top-right" />
      <div className="application">
        <div className="application_header">
          Application for Secondary Enrollment
        </div>

        {fileData ? (
          <div className="application-image">
            {isDeadlineOver ? (
              <div className="deadline-over">
                <p className="expired_text">⚠️ Deadline is over.</p>
              </div>
            ) : (
              <>
                <div
                  className="delete-button"
                  onClick={handleDelete}
                  title="Delete Application"
                >
                  <FontAwesomeIcon
                    icon={faTrash}
                    style={{ color: "red", cursor: "pointer" }}
                  />
                </div>
                <a href={fileData.file} download className="app_image">
                  <FontAwesomeIcon icon={faDownload} />
                  <h6>(click here to download)</h6>
                  <div className="due_date">
                    Due date: {moment(fileData.deadLine).format("DD/MMM/YYYY")}
                    <br />
                    <span className="des">
                      {fileData.description ||
                        "Fill the form and hand over to school office on or before the deadline"}
                    </span>
                  </div>
                </a>
                {/* Delete Button */}

              </>
            )}
          </div>
        ) : (
          <p>Loading application details...</p>
        )}
      </div>
    </div>
  );
};

export default SecondaryPage;
