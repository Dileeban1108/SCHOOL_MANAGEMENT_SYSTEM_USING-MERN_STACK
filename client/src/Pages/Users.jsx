import React from 'react';
import '../styles/users.css';
import user from "../assets/users.jpg"
const usersData = [
  { id: 1, image: user, name: 'John Doe', position: 'Software Engineer', degree: 'B.Sc. Computer Science' },
  { id: 2, image: user, name: 'Jane Smith', position: 'Project Manager', degree: 'M.Sc. Management' },
  { id: 3, image: user, name: 'Alice Johnson', position: 'Data Scientist', degree: 'Ph.D. Data Science' },
  // Add more users as needed
];

const Users = () => {
  return (
    <div className="users-container">
      <div className="users-wrapper">
        {usersData.map(user => (
          <div key={user.id} className="user-box">
            <img src={user.image} alt={user.name} className="user-image" />
            <div className="user-info">
              <h2>{user.name}</h2>
              <p>{user.position}</p>
              <p>{user.degree}</p>
            </div>
          </div>
        ))}
        {usersData.map(user => (
          <div key={user.id + usersData.length} className="user-box">
            <img src={user.image} alt={user.name} className="user-image" />
            <div className="user-info">
              <h2>{user.name}</h2>
              <p>{user.position}</p>
              <p>{user.degree}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;
