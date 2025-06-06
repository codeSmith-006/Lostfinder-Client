import React, { use } from "react";
import logo from "../../assets/LostFinder logo.png";
import { NavLink } from "react-router-dom";
import * as motion from "motion/react-client";
import AnimatedLink from "./AnimatedLinks/AnimatedLink";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const {test} = use(AuthContext)
  console.log(test)
  return (
    <div className="">
      <div className="navbar bg-transparent flex justify-between absolute z-50 px-5 py-5 md:py-7">
        {/* logo section */}
        <div className="flex items-center gap-4">
          <img src={logo} className="w-10 md:w-14" alt="" />
          <a href="/" className=" text-white font-bold text-xl md:text-3xl">
            LostFinder
          </a>
        </div>

        {/* navigation section */}
        <div className="hidden md:flex items-center gap-3 ">
          <AnimatedLink to="/">Home</AnimatedLink>

          {/* lost and find items */}
          <AnimatedLink to="/lost-and-found">Lost & Found Items</AnimatedLink>
        </div>

        {/* user section */}

        {/* when user not logged in */}

        <NavLink to='/login'>
          <motion.button
            whileHover={{
              scale: 1.1,
            }}
            transition={{
              duration: 0.2,
            }}
            className="px-4 py-2 cursor-pointer bg-blue-400 hover:bg-blue-500 text-white font-semibold rounded shadow-lg"
          >
            Login
          </motion.button>
        </NavLink>

        {/* when user logged in */}
        <div className="flex hidden items-center gap-2">
          <motion.button
            whileHover={{
              scale: 1.1,
            }}
            transition={{
              duration: 0.2,
            }}
            className="px-4 py-2 cursor-pointer bg-blue-400 hover:bg-blue-500 text-white font-semibold rounded shadow-lg"
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
                <div className="w-20 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <NavLink to="/" className="hidden md:flex justify-between">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/lost-and-found"
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
                  <NavLink to="/recoveredItems">All Recovered Items</NavLink>
                </li>
                <li>
                  <NavLink to="/manage-my-items">Manage My Items</NavLink>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
