import { Typography } from '@material-ui/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
        // toast.success("Logged Out Successfully");
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
      <h1>Logout !!</h1>
      <Typography>Are you sure you want to logout?</Typography>
      <br></br>
      <button onClick={handleLogout}>Logout</button>
      <br></br>
      <Typography>Thank you for choosing our platform! To ensure your privacy and security, please click the 'Logout' button below to safely end your session.</Typography>
    </div>
  );
};

export default LogOut;
