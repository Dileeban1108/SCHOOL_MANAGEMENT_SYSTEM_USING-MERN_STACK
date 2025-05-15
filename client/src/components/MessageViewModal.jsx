import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/messageModal.css';

const MessageViewModal = ({ show, onClose, userDetails }) => {
    const [messages, setMessages] = useState([]);
    const [activeTab, setActiveTab] = useState('inbox'); // 'inbox' or 'outbox'

    useEffect(() => {
        const fetchMessages = async () => {
            if (!userDetails?.email) return;

            try {
                let res;
                if (activeTab === 'inbox') {
                    res = await axios.get(`http://localhost:3001/auth/getMessagesByRecieverEmail/${userDetails.email}`);
                } else {
                    res = await axios.get(`http://localhost:3001/auth/getMessagesBySenderEmail/${userDetails.email}`);
                }

                setMessages(res.data || []);
            } catch (error) {
                console.error("Failed to fetch messages:", error);
            }
        };

        if (show) {
            fetchMessages();
        }
    }, [show, userDetails.email, activeTab]);

    if (!show) return null;

    return (
        <div className="modal-overlay_message" onClick={onClose}>
            <button className="cancel_button_2" onClick={onClose}>X</button>

            <div className="modal-content_message" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
                <h3>Messages</h3>

                {/* Tabs */}
                <div className="tabs">
                    <button
                        className={activeTab === 'inbox' ? 'active' : ''}
                        onClick={() => setActiveTab('inbox')}
                    >
                        Inbox
                    </button>
                    <button
                        className={activeTab === 'outbox' ? 'active' : ''}
                        onClick={() => setActiveTab('outbox')}
                    >
                        Outbox
                    </button>
                </div>

                {/* Message List */}
                {messages.length === 0 ? (
                    <p>No messages.</p>
                ) : (
                    <ul className="message-list">
                        {messages.map((msg, index) => (
                            <li key={msg._id || index} className="message-item">
                                <div className="message-header">
                                    <strong>{activeTab === 'inbox' ? 'From' : 'To'}:</strong>{' '}
                                    {activeTab === 'inbox' ? msg.senderName : msg.recieverName}
                                </div>
                                <div className="message-body">
                                    <strong>Message:</strong> {msg.message}
                                </div>
                                <div className="message-date">
                                    <small><strong>Date:</strong> {new Date(msg.createdAt).toLocaleString()}</small>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default MessageViewModal;
