import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import './Signup.css'

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://money-xg9v.onrender.com/api/v1/register",
        formData,
        {
          auth: {
            username: 'admin',
            password: 'admin@1234'
          }
        }
      );
      console.log("Data :",formData)
      if (response.status === 201) {
        console.log('Data stored successfully:', response.data);
        // Redirect to login page or perform any other action upon successful registration
        // Reset form after successful submission
        setFormData({
          username: '',
          password: '',
          email: ''
        });
      } else {
        console.error('Registration failed:', response.data.message);
      }
    } catch (error) {
      console.error('Error storing data:', error);
    }
  };
  

  return (
    <div className="signup-container">
      <motion.div
        className="signup-box"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              autoComplete="off"
              name="username"
              className="signup-input"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="signup-input"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              autoComplete="off"
              name="password"
              className="signup-input"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <motion.button
            type="submit"
            className="signup-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Register
          </motion.button>
        </form>
        <p className="signup-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Signup;
