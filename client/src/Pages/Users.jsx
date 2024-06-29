import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/users.css';
import userPlaceholderImage from '../assets/users.jpg';

const allowedPositions = ["principal", "vice principal", "sport coach"];

const fetchUsers = async () => {
  try {
    const response = await axios.get(`http://localhost:3001/auth/getUsers`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user details", error);
    return [];
  }
};

const Users = () => {
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const data = await fetchUsers();
      setUsersData(data);
    };
    getUsers();
  }, []);

  const filteredUsers = usersData.filter(user =>
    allowedPositions.includes(user.position.toLowerCase())
  );

  return (
    <div className="users-container">
      <div className="users-wrapper">
        {filteredUsers.map(user => {
          const greeting = user.sex === "female" ? "Ms." : "Mr.";
          return (
            <div key={user.id} className="user-box">
              <img src={user.image || userPlaceholderImage} alt={user.username} className="user-image_2" />
              <div className="user-info">
                <h2>{greeting} {user.username}</h2>
                <p>{user.position}</p>
                <p>{user.phone}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Users;
