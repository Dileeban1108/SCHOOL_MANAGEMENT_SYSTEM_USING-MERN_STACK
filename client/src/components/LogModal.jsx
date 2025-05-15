import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import "../styles/logModal.css";
import axios from 'axios';
import moment from 'moment';

const LogModal = ({ show, onClose, userDetails }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showLogInput, setShowLogInput] = useState(false);
  const [showToggleModal, setShowToggleModal] = useState(false);
  const [currentLog, setCurrentLog] = useState(null);
  const [logs, setLogs] = useState([]);
  const userInfoString = localStorage.getItem("userinfo");
  const userInfo = userInfoString ? JSON.parse(userInfoString) : null;
  const loggedInUserEmail = userInfo?.email;

  console.log(loggedInUserEmail);
  // Fetch logs from backend
  const fetchLogs = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/auth/getTimeLogsByEmail`, {
        params: { email: userDetails.email },
      });
      setLogs(response.data);
    } catch (error) {
      console.error("Failed to fetch logs:", error);
    }
  };

  useEffect(() => {
    if (show) {
      fetchLogs();
    }
  }, [show]);

  const formatDate = (date) => {
    return moment(date).format('YYYY-MM-DD');
  };

  const getTileClassName = ({ date, view }) => {
    if (view === 'month') {
      const log = logs.find(log => new Date(log.date).toDateString() === date.toDateString());
      if (log) {
        return log.status === 'present' ? 'present-date' : 'absent-date';
      }
    }
    return null;
  };

  const handleDateClick = (date) => {
    const log = logs.find(log => new Date(log.date).toDateString() === date.toDateString());
    setSelectedDate(date);

    if (log) {
      setCurrentLog(log);
      setShowToggleModal(true);
    } else {
      setShowLogInput(true);
    }
  };

  const handleLogSubmit = async (status) => {
    const logData = {
      date: formatDate(selectedDate),
      status,
      username: userDetails.username,
      email: userDetails.email,
    };

    try {
      await axios.post('http://localhost:3001/auth/logDate', logData);
      await fetchLogs();
    } catch (error) {
      console.error("Failed to submit log:", error);
    }

    setShowLogInput(false);
  };

  const handleToggleStatus = async () => {
    const newStatus = currentLog.status === 'present' ? 'absent' : 'present';

    const updatedLog = {
      ...currentLog,
      date: formatDate(selectedDate),
      status: newStatus,
      email: userDetails.email,
    };

    try {
      await axios.put('http://localhost:3001/auth/updateTimeLog', updatedLog);
      await fetchLogs(); // Refresh logs
    } catch (error) {
      console.error("Failed to update log:", error);
    }

    setShowToggleModal(false);
  };

  if (!show) return null;

  return (
    <div className="modal-background">
      <button onClick={onClose} className="cancel-btn">X</button>
      <div className="modal-container">
        <h2>Attendance Log</h2>
        <Calendar
          onClickDay={handleDateClick}
          tileClassName={getTileClassName}
        />
        {userDetails.email === loggedInUserEmail && (
          <>
            {showLogInput && (
              <div className="log-input">
                <div className="log-input-content">
                  <h3>Log attendance for {selectedDate.toDateString()}</h3>
                  <p>Please select the status for this date:</p>
                  <button onClick={() => handleLogSubmit("absent")}>Mark Absent</button>
                  <button onClick={() => handleLogSubmit("present")}>Mark Present</button>
                  <button onClick={() => setShowLogInput(false)}>Cancel</button>
                </div>
              </div>
            )}

            {showToggleModal && currentLog && (
              <div className={`toggle-modal ${currentLog.status}`}>
                <div className="toggle-content">
                  <h3>{selectedDate.toDateString()}</h3>
                  <p>
                    Currently marked as <strong>{currentLog.status.toUpperCase()}</strong>.
                  </p>
                  <p>Do you want to change it to <strong>{currentLog.status === 'present' ? 'ABSENT' : 'PRESENT'}</strong>?</p>
                  <button onClick={handleToggleStatus}>Yes, Change It</button>
                  <button onClick={() => setShowToggleModal(false)}>Cancel</button>
                </div>
              </div>
            )}
          </>

        )}
      </div>
    </div>
  );
};

export default LogModal;
