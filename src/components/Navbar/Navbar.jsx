import React, { use, useEffect, useState } from "react";
import logo from "../../assets/LostFinder logo.png";
import { NavLink, useLocation, useNavigation } from "react-router-dom";
import * as motion from "motion/react-client";
import AnimatedLink from "./AnimatedLinks/AnimatedLink";
import { AuthContext } from "../../context/AuthContext";
import { showToast } from "../Toast/Toast";
import { Tooltip } from "@mui/material";

const Navbar = () => {
  const { currentUser, loading, logout, photoURL } = use(AuthContext);
  
  // scroll animation
  const [scroll, setScroll] = useState(false);

  // handle scroll 
  useEffect(() => {
     const handleScroll = () => {
      setScroll(window.scrollY > 30)
     }

     window.addEventListener('scroll', handleScroll);
     return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  console.log("Scroll", scroll)

  const navigate = useNavigation();
  const location = useLocation();

  // conditional bag
  const bg =
    !location.pathname === "/"
      ? "bg-transparent"
      : 'bg-transparent';

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
        className={`navbar absolute bg-transparent shadow-[0_0_30px_rgba(0,0,0,0.1)]  flex justify-between  z-40 px-5 py-5 md:py-7 ${scroll ? 'fixed transition-all duration-300 backdrop-blur-md ' : ''}`}
      >
        {/* logo section */}
        <div className="flex items-center gap-4">
          <img src={logo} className="w-10 md:w-14" alt="" />
          <a href="/" className={` text-white font-bold text-xl md:text-3xl`}>
            LostFinder
          </a>
        </div>

        {/* user section */}
        <div className="flex items-center gap-5">
          {/* navigation section */}
          <div className="hidden md:flex items-center gap-3 ">
            <AnimatedLink to="/">Home</AnimatedLink>

            {/* lost and find items */}
            <AnimatedLink to="/allItems">Lost & Found Items</AnimatedLink>
          </div>
          {loading ? (
            <span className="loading loading-spinner text-info"></span>
          ) : currentUser ? (
            <div className="flex items-center gap-2">
              <motion.button
                onClick={handleLogout}
                whileHover={{
                  scale: 1.1,
                }}
                transition={{
                  duration: 0.2,
                }}
                className={`px-4 py-2 cursor-pointer bg-blue-400 hover:bg-blue-500 text-white font-semibold rounded shadow-lg`}
              >
                Logout
              </motion.button>
              <motion.div whileHover={{ scale: 1.1 }} className="flex">
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
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                  >
                    <li>
                      <NavLink
                        to="/"
                        className="hidden md:flex justify-between"
                      >
                        Home
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/allItems"
                        className="hidden md:flex justify-between"
                      >
                        Lost & Found Items
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/addItems" className="justify-between">
                        Add Lost & Found Item
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/recoveredItems">
                        All Recovered Items
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/myItems">Manage My Items</NavLink>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          ) : (
            <div className="">
              <NavLink to="/login">
                <motion.button
                  whileHover={{
                    scale: 1.1,
                  }}
                  transition={{}}
                  className={`px-4 py-2 cursor-pointer bg-blue-400 hover:bg-blue-500 text-white font-semibold rounded shadow-lg`}
                >
                  {" "}
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
