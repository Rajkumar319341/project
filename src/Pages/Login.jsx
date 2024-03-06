import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import './Login.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [invalidCredentials, setInvalidCredentials] = useState(false); // Define invalidCredentials state

  const navigate = useNavigate();

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
      const response = await axios.post('https://money-xg9v.onrender.com/api/v1/login', formData);
      console.log('Login successful:', response.data);

      // Extract the user ID from the response data
      const userId = response.data.user._id;

      // Store the user ID in local storage
      localStorage.setItem('userId', userId);
      console.log("userId",userId)

      // Reset the form fields after successful login
      setFormData({
        email: '',
        password: ''
      });

      // Redirect to the desired page after successful login
      navigate('/dashboard'); // Change '/add-account' to the desired route
    } catch (error) {
      console.error('Login failed:', error);
      setInvalidCredentials(true); // Set invalidCredentials to true if login fails
    }
  };

  return (
    <div className="login-container">
      <AnimatePresence>
        {/* Display error message if login fails */}
        {invalidCredentials && (
          <motion.div
            className="error-card"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
          >
            <p className="error-message">Invalid Credentials</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="login-box"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <>
          <h2 className="login-heading">Welcome Back</h2>
          <p className="login-content">
            Log in to access your account and manage your finances.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Enter email"
                autoComplete="off"
                name="email"
                className="login-input"
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
                className="login-input"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <motion.button
              type="submit"
              className="login-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.button>
          </form>
          <p className="signup-link">
            Don't have an account? <Link to="/register">Signup</Link>
          </p>
        </>
      </motion.div>
    </div>
  );
}

export default Login;
