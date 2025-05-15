import React from "react";
import "../styles/application.css";
import NavBar from "../components/NavBarOptional";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
const PrimaryPage = () => {
  return (
    <div className="application_container">
      <NavBar />
      <div className="application">
        <div className="application_header">
          Application for Advanced Level Enrollement
        </div>
        <div className="application-image">
          <a
            href="/Dileeban_CV.pdf"
            download="Dileeban_CV.pdf"
            className="app_image"
          >
            <FontAwesomeIcon icon={faDownload} />
            <h6>(click here to download)</h6>
            <div className="due_date">
              Due date : 24 june 2024<br></br>
              <span className="des">
                fill the form and handover to school office on or before the
                deadline
              </span>
            </div>{" "}
          </a>
        </div>
      </div>
    </div>
  );
};

export default PrimaryPage;
