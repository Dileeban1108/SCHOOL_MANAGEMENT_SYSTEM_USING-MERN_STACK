// MessageModal.js
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/messageModal.css';

const MessageModal = ({ show, onClose, user, userDetails }) => {
    const [message, setMessage] = useState('');

    if (!show || !user) return null;

    const handleSend = async () => {
        const messageData = {
            recieverName: user.username,
            recieverEmail: user.email,
            message: message,
            senderName:userDetails.username,
            senderEmail:userDetails.email,
        };

        try {
            await axios.post('http://localhost:3001/auth/sendMessage', messageData);
            setMessage('');
            onClose();
        } catch (error) {
            console.error("Failed to submit:", error);
        }
    };

    return (
        <div className="modal-overlay_message">
            <div className="modal-content_message">
                <button className="cancel_button_2" onClick={onClose}>X</button>
                <h2>Send Message</h2>
                <p><strong>To:</strong> {user.username} ({user.email})</p>
                <textarea
                    placeholder="Type your message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                />
                <button className="send-button" onClick={handleSend}>Send</button>
            </div>
        </div>
    );
};

export default MessageModal;
