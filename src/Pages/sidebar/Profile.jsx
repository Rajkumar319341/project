import React, { useState } from 'react';
import { Grid, Paper, TextField, Button, Typography } from '@material-ui/core';

const Profile = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUpdatePassword = () => {
    // Validate input fields
    if (oldPassword === '' || newPassword === '' || confirmNewPassword === '') {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setErrorMessage('New password and confirm password do not match.');
      return;
    }

    const requestBody = {
      oldPassword: oldPassword,
      newPassword: newPassword,
      confirmNewPassword: confirmNewPassword
    };
    console.log("Requested Body:",requestBody)

    fetch('https://money-xg9v.onrender.com/api/v1/user/update/password', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('c4eadmin:admin@1234')
      },
      body: JSON.stringify(requestBody)
    })
    .then(response => {
      if (response.status===200) {
        // Password updated successfully
        alert('Password updated successfully.');
      } else if (response.status === 401) {
        setErrorMessage('Unauthorized: Please check your credentials.');
      } else {
        return response.json().then(data => {
          throw new Error(data.message || 'Error updating password.');
        });
      }
    })
    .catch(error => {
      console.error('Error:', error);
      setErrorMessage(error.message || 'Error updating password.');
    });
  };

  return (
    <Grid container justify="center" alignItems="center" style={{ minHeight: '100vh' }}>
      <Grid item xs={10} sm={6} md={4} lg={3}>
        <Paper elevation={3} style={{ padding: 20 }}>
          {errorMessage && <Typography color="error">{errorMessage}</Typography>}
          <Typography>Old Password</Typography>
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            type="password"
            value={oldPassword}
            onChange={(e) => {
              setOldPassword(e.target.value);
              setErrorMessage('');
            }}
          />
          <Typography>New Password</Typography>
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            type="password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              setErrorMessage('');
            }}
          />
          <Typography>Confirm Password</Typography>
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            type="password"
            value={confirmNewPassword}
            onChange={(e) => {
              setConfirmNewPassword(e.target.value);
              setErrorMessage('');
            }}
          />
          <Button variant="contained" color="primary" style={{ marginTop: 20 }} onClick={handleUpdatePassword}>
            Update
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Profile;
