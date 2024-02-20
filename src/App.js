// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Income from './Pages/sidebar/Income/Income'
import Landingpage from "./LandingPage/Landingpage";
import Howitworks from "./LandingPage/Howitworks";
import Blog from "./LandingPage/Blog";
import ContactUs from "./LandingPage/ContactUs";
import SideBar from "./components/Sidebar/Sidebar";
import AccountInfo from "./Pages/sidebar/AccountInfo";
import Investments from "./Pages/sidebar/Investments/Investments";
import Insurance from "./Pages/sidebar/Insurance/Insurance";
import LoanForm from "./Pages/sidebar/Loan/Loan";
import Tutorials from "./Pages/sidebar/Tutorials/Tutorials";
import './App.css'
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <div className="app-container">
        <SideBar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Landingpage />} />
            <Route path="/howitworks" element={<Howitworks />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/account-info" element={<AccountInfo />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/income" element={<Income />} />
            <Route path="/investments" element={<Investments />} />
            <Route path="/insurance" element={<Insurance />} />
            <Route path="/loan" element={<LoanForm />} />
            <Route path="/tutorials" element={<Tutorials />} />
            
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
