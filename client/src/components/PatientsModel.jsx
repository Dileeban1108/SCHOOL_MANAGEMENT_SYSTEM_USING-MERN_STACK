import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/patientsModel.css";

const PatientsModal = ({ onClose }) => {
  const [allPatients, setAllPatients] = useState([]);
  const [bookedPatients, setBookedPatients] = useState([]);
  const [messages, setMessages] = useState({});
  const [doctorDetails, setDoctorDetails] = useState({});

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const userinfo = JSON.parse(localStorage.getItem("userinfo"));
        const email = userinfo?.email;
        if (email) {
          console.log(`Fetching doctor details for email: ${email}`);
          const response = await axios.get(`http://localhost:3001/auth/getDoctor/${email}`);
          console.log("Doctor details fetched:", response.data);
          setDoctorDetails(response.data);
        } else {
          console.log("No email found in localStorage.");
        }
      } catch (error) {
        console.error("Failed to fetch doctor details", error);
      }
    };

    fetchDoctorDetails();
  }, []);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const allPatientsResponse = await axios.get("http://localhost:3001/auth/getPatients");
        console.log("All patients fetched:", allPatientsResponse.data);
        const patients = allPatientsResponse.data || [];

        // Filter booked patients based on doctor's username
        if (doctorDetails.username) {
          const bookedPatientsData = patients.filter(patient => patient.doctername === doctorDetails.username);
          console.log("Booked patients filtered:", bookedPatientsData);

          setBookedPatients(bookedPatientsData);

          // Set up initial message state for booked patients
          const initialMessages = {};
          bookedPatientsData.forEach(patient => {
            if (patient && patient.username) {
              initialMessages[patient.username] = "";
            }
          });
          setMessages(initialMessages);
        }

        setAllPatients(patients);
      } catch (error) {
        console.error("Failed to fetch patients", error);
      }
    };

    if (doctorDetails.username) {
      fetchPatients();
    }
  }, [doctorDetails]);

  const handleMessageChange = (e, patientUsername) => {
    setMessages({
      ...messages,
      [patientUsername]: e.target.value,
    });
  };

  const handleSendMessage = async (patientUsername, patientEmail) => {
    const message = messages[patientUsername];
    try {
      await axios.post("http://localhost:3001/email/sendEmail", {
        email: patientEmail,
        message,
      });
      alert(`Message sent to ${patientUsername}: ${message}`);
    } catch (error) {
      console.error("Failed to send message", error);
      alert("Failed to send message");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content_2">
        <div className="button-container">
          <h2>Patients</h2>
          <button className="close-button_5" onClick={onClose}>
            X
          </button>
        </div>
        <div className="main-patients-list-container">
          <div className="patients-list-container">
            <h3>Patients Who Booked You</h3>
            <div className="patients-list_2">
              {bookedPatients.length > 0 ? (
                bookedPatients.map((patient, index) => (
                  patient && patient.username ? (
                    <div key={index} className="patient-box_2">
                      <h3>{patient.username}</h3>
                      <p>Address: {patient.address}</p>
                      <p>Age: {patient.age}</p>
                      <p>Email: {patient.email}</p>
                      <div className="message-box">
                        <input
                          type="text"
                          placeholder="Enter message"
                          value={messages[patient.username] || ""}
                          onChange={(e) => handleMessageChange(e, patient.username)}
                        />
                        <button onClick={() => handleSendMessage(patient.username, patient.email)}>Send</button>
                      </div>
                    </div>
                  ) : null
                ))
              ) : (
                <p>No patients have booked you.</p>
              )}
            </div>
          </div>
          <div className="patients-list-container">
            <h3>All Patients</h3>
            <div className="patients-list_2">
              {allPatients.length > 0 ? (
                allPatients.map((patient, index) => (
                  patient && patient.username ? (
                    <div key={index} className="patient-box_2">
                      <h3>{patient.username}</h3>
                      <p>Address: {patient.address}</p>
                      <p>Age: {patient.age}</p>
                    </div>
                  ) : null
                ))
              ) : (
                <p>No patients available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientsModal;
