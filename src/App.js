import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Income from "./Pages/sidebar/Income/Income";
import Landingpage from "./LandingPage/Landingpage";
import Howitworks from "./LandingPage/Howitworks";
import Blog from "./LandingPage/Blog";
import ContactUs from "./LandingPage/ContactUs";
import SideBar from "./components/Sidebar/Sidebar";
import AccountInfo from "./Pages/sidebar/AccountInfo";
import Investments from "./Pages/sidebar/Investments/Investments";
import Insurance from "./Pages/sidebar/Insurance/Insurance";
import Loan from "./Pages/sidebar/Loan/Loan";
import Tutorials from "./Pages/sidebar/Tutorials/Tutorials";
import "./App.css";
import Records from "./Pages/sidebar/Records/Records";
import Expense from "./Pages/sidebar/Expense/Expense";
import Dashboard from "./Pages/Dashboard";
// import Profile from "./Pages/sidebar/Profile";
import LogOut from "./Pages/LogOut";
import ChatBot from "./Pages/sidebar/ChatBot";

function Content() {
  const location = useLocation();
  const showSidebar =
    location.pathname !== "/" &&
    location.pathname !== "/login" &&
    location.pathname !== "/register" &&
    location.pathname !== "/howitworks" &&
    location.pathname !== "/blog" &&
    location.pathname !== "/contact-us";

  return (
    <div className="app-container">
      {showSidebar && <SideBar />}
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
          <Route path="expense" element={<Expense />} />
          <Route path="/investments" element={<Investments />} />
          <Route path="/insurance" element={<Insurance />} />
          <Route path="/loan" element={<Loan />} />
          <Route path="/tutorials" element={<Tutorials />} />
          <Route path="/records" element={<Records />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/profile" element={<Profile/>}/> */}
          <Route path="/logout" element={<LogOut/>}/>
          <Route path="/chatbot" element={<ChatBot/>}/>
          
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Content />
    </Router>
  );
}

export default App;