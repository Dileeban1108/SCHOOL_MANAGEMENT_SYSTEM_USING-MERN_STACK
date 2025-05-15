import React, { useState } from "react";
import NavBar from "../components/NavBarOptional";
import AddApplicationForm from "../components/AddApplicationForm"; // new component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import "../styles/application.css";

const PrimaryPage = () => {
  const [applications, setApplications] = useState([]);

  const handleAddApplication = (newApp) => {
    setApplications((prevApps) => [...prevApps, newApp]);
  };

  const primaryApps = applications.filter(app => app.type === "primary");

  return (
    <div className="application_container">
      <NavBar />
      <AddApplicationForm onSubmit={handleAddApplication} />

      <div className="application">
        <div className="application_header">
          Primary Applications
        </div>

        {primaryApps.map((app, index) => (
          <div className="application-image" key={index}>
            <a
              href={URL.createObjectURL(app.file)}
              download={app.file.name}
              className="app_image"
            >
              <FontAwesomeIcon icon={faDownload} />
              <h6>(click here to download)</h6>
              <div className="due_date">
                Due date : {new Date(app.deadline).toLocaleDateString()}
                <br />
                <span className="des">
                  Fill the form and handover to school office on or before the deadline.
                </span>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrimaryPage;
