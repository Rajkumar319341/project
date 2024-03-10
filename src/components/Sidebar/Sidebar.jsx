import React from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaHome, FaLock, FaMoneyBill, FaUser } from "react-icons/fa";
import { HiCreditCard } from "react-icons/hi";
import { MdMessage } from "react-icons/md";
import { BiAnalyse, BiSearch } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { BsBookFill } from "react-icons/bs";
import { BsFillBookmarksFill } from "react-icons/bs";
import { AiTwotoneFileExclamation } from "react-icons/ai";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import "./SideBar.css";

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    path: "/account-info",
    name: "Bank Account",
    icon: <AccountCircleIcon fontSize="small" />,
  },
  {
    path: "/income",
    name: "Income",
    icon: <HiCreditCard />,
  },
  {
    path: "/expense",
    name: "Expenses",
    icon: <MdMessage />,
  },
  {
    path: "/investments",
    name: "Investments",
    icon: <BiAnalyse />,
  },
  {
    path: "/insurance",
    name: "Insurance",
    icon: <AiTwotoneFileExclamation />,
  },
  {
    path: "/loan",
    name: "Loans",
    icon: <BsFillBookmarksFill />,
  },
  //   {
  //     path: "/settings",
  //     name: "Settings",
  //     icon: <BiCog />,
  //     exact: true,
  //     subRoutes: [
  //       {
  //         path: "/settings/profile",
  //         name: "ProfilePage",
  //         icon: <FaUser />,
  //       },
  //       {
  //         path: "/settings/billing",
  //         name: "Toggle",
  //         icon: <FaMoneyBill />,
  //       },
  //     ],
  //   },
  {
    path: "/tutorials",
    name: "Tutorials",
    icon: <LiveTvIcon fontSize="small" />,
  },
  {
    path: "/Records",
    name: "Records",
    icon: <BsBookFill />,
  },
  {
    path: "/chatbot",
    name: "ChatBot",
    icon: <LiveTvIcon fontSize="small" />,
  },
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);

  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.0,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.0,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.0,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.0,
      },
    },
  };

  return (
    <>
      <div className="main-container">
        <motion.div className="sidebar">
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h2
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  Money Gaffer
                </motion.h2>
              )}
            </AnimatePresence>
          </div>

          <div className="search">
            <div className="search_icon">
              <BiSearch />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.input
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={inputAnimation}
                  type="text"
                  placeholder="Search"
                />
              )}
            </AnimatePresence>
          </div>

          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    key={index}
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }
              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">{route.icon}</div>
                  <div className="link_text">{route.name}</div>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar;