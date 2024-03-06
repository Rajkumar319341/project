import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogOut = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch('https://money-xg9v.onrender.com/api/v1/logout', {
      method: 'POST',
      credentials: 'include'
    })
    .then(response => {
      if (response.ok || response.status === 200) {
        alert('Logged Out Successfully');
        navigate('/');
      } else {
        alert('Error logging out. Please try again.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error logging out. Please try again.');
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10rem' }}>
      <h1>Logout</h1>
      <p>Are you sure you want to logout?</p>
      <button onClick={handleLogout}>Logout</button>
      <p>Thank you for using our service!</p>
    </div>
  );
};

export default LogOut;
