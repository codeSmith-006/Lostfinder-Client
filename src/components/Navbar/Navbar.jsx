import React, { use, useEffect, useState } from "react";
import logo from "../../assets/LostFinder logo.png";
import {
  NavLink,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import * as motion from "motion/react-client";
import AnimatedLink from "./AnimatedLinks/AnimatedLink";
import { AuthContext } from "../../context/AuthContext";
import { showToast } from "../Toast/Toast";
import { Tooltip } from "@mui/material";

const Navbar = () => {
  const { currentUser, loading, logout, photoURL } = use(AuthContext);
  const navigate = useNavigation();
  const navigating = useNavigate();
  const location = useLocation();

  // State to keep track of which section to scroll after redirect
  const [scrollTarget, setScrollTarget] = React.useState(null);

  const handleNavClick = (id) => {
    if (location.pathname === "/" || location.pathname === "/home") {
      // Already on home page — scroll immediately
      scrollToSection(id);
    } else {
      // Not on home page — navigate there first
      console.log("navigating");
      navigating("/");
      setScrollTarget(id);
    }
  };

  // After navigation, scroll to the target section
  useEffect(() => {
    if (
      (location.pathname === "/" || location.pathname === "/home") &&
      scrollTarget
    ) {
      // small timeout to wait for DOM to render
      setTimeout(() => {
        scrollToSection(scrollTarget);
        setScrollTarget(null);
      }, 100);
    }
  }, [location.pathname, scrollTarget]);

  // smooth scroll animation
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    section.scrollIntoView({ behavior: "smooth" });
  };

  // scroll animation
  const [scroll, setScroll] = useState(false);

  // handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // handle logout button
  const handleLogout = () => {
    logout()
      .then(() => {
        showToast("success", "Signout successfully");
        navigate("/");
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="">
      <div
        className={`navbar absolute bg-transparent shadow-[0_0_30px_rgba(0,0,0,0.1)]  flex justify-between  z-40 px-3 md:px-10 py-2 md:py-4 ${
          scroll ? "fixed transition-all duration-300 backdrop-blur-md " : ""
        }`}
      >
        {/* logo section */}
        <div className="flex items-center gap-2">
          <img src={logo} className="w-7 md:w-10" alt="" />
          <a
            href="/"
            className={` text-white font-bold  text-lg md:text-xl lg:text-2xl `}
          >
            LostFinder
          </a>
        </div>

        {/* user section */}
        <div className="flex items-center gap-5">
          {/* navigation section */}
          <div className="hidden md:flex items-center gap-5">
            <button onClick={() => scrollToSection("home")}>
              <AnimatedLink to="/">Home</AnimatedLink>
            </button>

            {/* Latest items section */}

            <motion.div
              className="relative"
              whileHover="hover"
              initial="rest"
              animate="rest"
            >
              <button
                className="text-white hover:text-gray-300  cursor-pointer text-sm md:text-lg lg:text-xl  "
                onClick={() => handleNavClick("latest-items")}
              >
                Latest Items
              </button>
              <motion.span
                className="absolute left-0 bottom-0 h-[2px] bg-[#6ABCE7]"
                variants={{
                  rest: { width: 0 },
                  hover: { width: "100%" },
                }}
                transition={{
                  duration: 0.1,
                  ease: "easeInOut",
                }}
              ></motion.span>
            </motion.div>

            {/* Success stories section */}

            <motion.div
              className="relative"
              whileHover="hover"
              initial="rest"
              animate="rest"
            >
              <button
                className="text-white hover:text-gray-300  cursor-pointer text-sm md:text-lg lg:text-xl  "
                onClick={() => handleNavClick("success-stories")}
              >
                Success Stories
              </button>
              <motion.span
                className="absolute left-0 bottom-0 h-[2px] bg-[#6ABCE7]"
                variants={{
                  rest: { width: 0 },
                  hover: { width: "100%" },
                }}
                transition={{
                  duration: 0.1,
                  ease: "easeInOut",
                }}
              ></motion.span>
            </motion.div>

            {/* faq section */}

            <motion.div
              className="relative"
              whileHover="hover"
              initial="rest"
              animate="rest"
            >
              <button
                className="text-white hover:text-gray-300  cursor-pointer text-sm md:text-lg lg:text-xl  "
                onClick={() => handleNavClick("faq")}
              >
                FAQ
              </button>
              <motion.span
                className="absolute left-0 bottom-0 h-[2px] bg-[#6ABCE7]"
                variants={{
                  rest: { width: 0 },
                  hover: { width: "100%" },
                }}
                transition={{
                  duration: 0.1,
                  ease: "easeInOut",
                }}
              ></motion.span>
            </motion.div>

            {/* lost and find items */}
            <AnimatedLink to="/allItems">All Items</AnimatedLink>
          </div>
          {loading ? (
            <span className="loading loading-spinner text-info"></span>
          ) : currentUser ? (
            <div className="flex items-center gap-2">
              {/* <motion.button
                onClick={handleLogout}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0 }}
                className="md:px-5 cursor-pointer py-[6px] rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-semibold shadow-md shadow-cyan-400/30 hover:shadow-xl transition-all duration-300 hidden  md:flex lg:hidden items-center gap-2 text-sm md:text-lg lg:text-xl"
              >
                <i className="fas fa-sign-out-alt"></i>
                Logout
              </motion.button> */}

              <motion.div whileHover={{ scale: 1.01 }} className="flex">
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost md:w-12 btn-circle avatar"
                  >
                    <Tooltip title={currentUser?.displayName}>
                      <div className="w-20 rounded-full">
                        <img alt="User's photo" src={photoURL} />
                      </div>
                    </Tooltip>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content backdrop-blur-md bg-gray-900/80 border border-gray-600 rounded-xl z-50 mt-3 w-60 p-2 shadow-lg text-gray-200"
                  >
                    <li>
                      <NavLink
                        to="/"
                        className="md:flex items-center justify-between hover:bg-gray-800 hover:text-white rounded-lg px-3 py-2 transition"
                      >
                        <i className="fas fa-home text-teal-400 mr-2"></i> Home
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/allItems"
                        className="flex items-center justify-between hover:bg-gray-800 hover:text-white rounded-lg px-3 py-2 transition"
                      >
                        <i className="fas fa-boxes text-teal-400 mr-2"></i> Lost
                        & Found Items
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/addItems"
                        className="flex items-center justify-between hover:bg-gray-800 hover:text-white rounded-lg px-3 py-2 transition"
                      >
                        <i className="fas fa-plus-circle text-teal-400 mr-2"></i>{" "}
                        Add Lost & Found Item
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/recoveredItems"
                        className="flex items-center justify-between hover:bg-gray-800 hover:text-white rounded-lg px-3 py-2 transition"
                      >
                        <i className="fas fa-check-circle text-teal-400 mr-2"></i>{" "}
                        All Recovered Items
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/myItems"
                        className="flex items-center justify-between hover:bg-gray-800 hover:text-white rounded-lg px-3 py-2 transition"
                      >
                        <i className="fas fa-user-cog text-teal-400 mr-2"></i>{" "}
                        Manage My Items
                      </NavLink>
                    </li>
                    <li
                      onClick={handleLogout}
                      className="flex flex-row items-center justify-between hover:bg-gray-800 hover:text-white rounded-lg py-2 transition"
                    >
                      <i className="fas fa-sign-out-alt text-teal-400 text-lg"></i>
                      <span className="font-medium">Logout</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          ) : (
            <div className="">
              <NavLink to="/login">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0 }}
                  className="px-3 cursor-pointer py-1 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-semibold shadow-md shadow-cyan-400/30 hover:shadow-xl transition-all duration-300 flex items-center gap-2 text-sm"
                >
                  <i className="fas fa-sign-in-alt"></i>
                  Login
                </motion.button>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
