// App.jsx
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/howitworks" element={<Howitworks />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route
          path="/account-info"
          element={
            <SideBar>
              <AccountInfo />
            </SideBar>
          }
        />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/income"
          element={
            <SideBar>
              <Income />
            </SideBar>
          }
        />
        <Route
          path="/investments"
          element={
            <SideBar>
              <Investments />
            </SideBar>
          }
        />
        <Route
          path="/insurance"
          element={
            <SideBar>
              <Insurance />
            </SideBar>
          }
        />
        <Route
          path="/loan"
          element={
            <SideBar>
              <LoanForm />
            </SideBar>
          }
        />
        <Route
          path="/tutorials"
          element={
            <SideBar>
              <Tutorials />
            </SideBar>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
