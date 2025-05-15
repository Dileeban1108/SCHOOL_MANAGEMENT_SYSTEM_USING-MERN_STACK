// AllLogsModal.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/allLogsModal.css";
import LogModal from './LogModal'; // reuse the same calendar modal
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import MessageModal from './MessageModal'
const AllLogsModal = ({ show, onClose, userDetails }) => {
    const [logs, setLogs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showMessageModal, setShowMessageModal] = useState(false)
    const fetchAllLogs = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:3001/auth/getTimeLogs");
            setLogs(response.data);
        } catch (err) {
            console.error("Failed to load logs:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (show) {
            fetchAllLogs();
            setSearchTerm('');
            setSelectedUser(null);
        }
    }, [show]);

    const filteredLogs = logs.filter(
        log =>
            (log.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                log.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
            log.email !== userDetails.email // <-- Exclude current user
    );

    const groupedByEmail = filteredLogs.reduce((acc, log) => {
        if (!acc[log.email]) acc[log.email] = [];
        acc[log.email].push(log);
        return acc;
    }, {});

    return (
        <>
            {selectedUser && (
                <LogModal
                    show={true}
                    onClose={() => setSelectedUser(null)}
                    userDetails={selectedUser}
                />

            )}
            {!selectedUser && show && (
                <div className="modal-overlay_atl">
                    <button className="cancel_button_2" onClick={onClose}>X</button>
                    <div className="modal-content_atl">
                        <h2 className="staff_header">All Staff Logs</h2>

                        <div className="searchinput2">
                            <input
                                type="text"
                                placeholder="Search by username or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {loading ? (
                            <p>Loading logs...</p>
                        ) : Object.keys(groupedByEmail).length === 0 ? (
                            <p>No logs found.</p>
                        ) : (
                            <div className="users">
                                {Object.entries(groupedByEmail).map(([email, logs]) => (
                                    <div
                                        key={email}
                                        className="user_box_atl"
                                        onClick={() =>
                                            setSelectedUser({
                                                email,
                                                username: logs[0].username,
                                            })
                                        }
                                    >
                                        <div className="user-info_atl">
                                            <p><strong>Username:</strong> {logs[0].username}</p>
                                            <p><strong>Email:</strong> {email}</p>
                                            <p onClick={(e) => {
                                                e.stopPropagation(); // Prevent triggering parent onClick
                                                setSelectedUser({
                                                    email,
                                                    username: logs[0].username,
                                                });
                                                setShowMessageModal(true);
                                            }}
                                                className='message'><FontAwesomeIcon icon={faMessage} /></p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
            <MessageModal
                show={showMessageModal}
                onClose={() => setShowMessageModal(false)}
                user={selectedUser}
                userDetails={userDetails}
            />

        </>
    );
};

export default AllLogsModal;
