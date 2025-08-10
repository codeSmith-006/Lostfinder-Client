import React, { useEffect, useState, useContext } from "react";
import logo from "../../assets/LostFinder logo.png";
import DarkModeToggle from "react-dark-mode-toggle";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../../context/AuthContext";
import { showToast } from "../Toast/Toast";
import { Tooltip, Avatar, Dropdown, Button, Drawer, Grid } from "antd";
import {
  HomeOutlined,
  AppstoreOutlined,
  PlusCircleOutlined,
  CheckCircleOutlined,
  SettingOutlined,
  LogoutOutlined,
  LoginOutlined,
  ExportOutlined,
  MenuOutlined,
} from "@ant-design/icons";

// import "./antd-overrides.css";

const { useBreakpoint } = Grid;

const Navbar = ({ isDarkMode, setIsDarkMode }) => {
  const { currentUser, loading, logout, photoURL } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const screens = useBreakpoint();

  // const [isDarkMode, setIsDarkMode] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Dark mode toggle effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Logout handler
  const handleLogout = () => {
    logout()
      .then(() => {
        showToast("success", "Signout successfully");
        navigate("/");
      })
      .catch((error) => console.error(error));
  };

  // const location = useLocation();

  // Only render links if current path is "/"

  const menuItems = [
    {
      key: "1",
      label: (
        <NavLink
          to="/"
          onClick={() => setSidebarOpen(false)}
          className="flex items-center gap-2"
        >
          <HomeOutlined /> Home
        </NavLink>
      ),
    },
    {
      key: "2",
      label: (
        <NavLink
          to="/allItems"
          onClick={() => setSidebarOpen(false)}
          className="flex items-center gap-2"
        >
          <AppstoreOutlined /> Lost & Found Items
        </NavLink>
      ),
    },
    {
      key: "3",
      label: (
        <NavLink
          to="/addItems"
          onClick={() => setSidebarOpen(false)}
          className="flex items-center gap-2"
        >
          <PlusCircleOutlined /> Add Lost & Found Item
        </NavLink>
      ),
    },
    {
      key: "4",
      label: (
        <NavLink
          to="/recoveredItems"
          onClick={() => setSidebarOpen(false)}
          className="flex items-center gap-2"
        >
          <CheckCircleOutlined /> All Recovered Items
        </NavLink>
      ),
    },
    {
      key: "5",
      label: (
        <NavLink
          to="/myItems"
          onClick={() => setSidebarOpen(false)}
          className="flex items-center gap-2"
        >
          <SettingOutlined /> Manage My Items
        </NavLink>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "6",
      label: (
        <div
          onClick={() => {
            setSidebarOpen(false);
            handleLogout();
          }}
          className="flex items-center gap-2 text-red-400 hover:text-red-500 cursor-pointer"
        >
          <LogoutOutlined /> Logout
        </div>
      ),
    },
  ];

  // Desktop dropdown menu for profile
  const desktopDropdown = (
    <Dropdown
      menu={{ items: menuItems }}
      placement="bottomRight"
      arrow
      trigger={["hover"]}
    >
      <Tooltip title={currentUser?.displayName}>
        <Avatar
          src={photoURL}
          size={48}
          style={{ border: "2px solid #6ABCE7", cursor: "pointer" }}
        />
      </Tooltip>
    </Dropdown>
  );

  // Mobile sidebar content with user photo
  const sidebarContent = (
    <div className="flex flex-col h-full p-6 text-white bg-[#191919]">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {currentUser ? (
            <Avatar
              src={photoURL}
              size={64}
              style={{ border: "2px solid #6ABCE7" }}
            />
          ) : (
            <Avatar size={64} style={{ backgroundColor: "#6ABCE7" }}>
              U
            </Avatar>
          )}
          <div className="text-lg font-semibold">
            {currentUser?.displayName || "Guest"}
          </div>
        </div>
        <Button
          type="text"
          onClick={() => setSidebarOpen(false)}
          className="text-white text-3xl"
          aria-label="Close sidebar"
        >
          ×
        </Button>
      </div>
      <nav className="flex flex-col gap-5 text-lg">
        {menuItems.map((item) =>
          item.type === "divider" ? (
            <hr key="divider" className="border-gray-700" />
          ) : (
            <div
              key={item.key}
              className="cursor-pointer hover:text-cyan-400"
              onClick={item.label.props.onClick}
            >
              {item.label}
            </div>
          )
        )}
      </nav>

      <div className="mt-auto pt-6 border-t border-gray-700">
        <div className="flex items-center gap-2">
          <DarkModeToggle
            onChange={setIsDarkMode}
            checked={isDarkMode}
            size={40}
          />
          <span>Dark Mode</span>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div
        className={`navbar absolute bg-transparent shadow-[0_0_30px_rgba(0,0,0,0.1)] z-40 px-3 md:px-10 py-2 md:py-4 ${
          scroll ? "fixed transition-all duration-300 backdrop-blur-md" : ""
        } flex items-center justify-between`}
      >
        {/* logo */}
        <div className="flex items-center gap-2">
          <motion.img
            src={logo}
            className="w-7 md:w-10"
            alt="LostFinder"
            whileHover={{ rotate: 5, scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          <NavLink
            to="/"
            className="text-white font-bold text-lg md:text-xl lg:text-2xl tracking-wide"
          >
            LostFinder
          </NavLink>
        </div>

        {/* navigation center (desktop only) */}
        <div className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2 text-white">
          <NavLink
            to="/"
            className="flex items-center gap-1 hover:text-cyan-400 transition"
          >
            Home{" "}
            <ExportOutlined
              style={{ fontSize: "0.75rem", marginLeft: "4px" }}
            />
          </NavLink>

          {location.pathname === "/" && (
            <>
              {[
                { id: "latest-items", label: "Latest Items" },
                { id: "success-stories", label: "Success Stories" },
                { id: "faq", label: "FAQ" },
                { id: "blog", label: "Blog & Articles" },
              ].map((link) => (
                <motion.div
                  key={link.id}
                  className="relative cursor-pointer"
                  whileHover={{ scale: 1.05, color: "#6ABCE7" }}
                  onClick={() => {
                    const section = document.getElementById(link.id);
                    section?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {link.label}
                </motion.div>
              ))}
            </>
          )}

          <NavLink
            to="/allItems"
            className="flex items-center gap-1 hover:text-cyan-400 transition"
          >
            All Items{" "}
            <ExportOutlined
              style={{ fontSize: "0.75rem", marginLeft: "4px" }}
            />
          </NavLink>
        </div>

        {/* right side: dark mode + profile or login */}
        <div className="flex items-center gap-4">
          <DarkModeToggle
            onChange={setIsDarkMode}
            checked={isDarkMode}
            size={50}
          />

          {loading ? (
            <span className="loading loading-spinner text-info"></span>
          ) : currentUser ? (
            <>
              {/* desktop dropdown */}
              {screens.md && desktopDropdown}

              {/* mobile menu icon */}
              {!screens.md && (
                <Button
                  type="text"
                  icon={
                    <MenuOutlined
                      style={{
                        fontSize: "28px",
                        color: isDarkMode ? "#E0E0E0" : "white", // light icon in dark mode, dark icon in light mode
                      }}
                    />
                  }
                  onClick={() => setSidebarOpen(true)}
                  aria-label="Open sidebar menu"
                  style={{
                    backgroundColor: isDarkMode
                      ? "rgba(255, 255, 255, 0.1)"
                      : "transparent",
                    borderRadius: "6px",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = isDarkMode
                      ? "rgba(255, 255, 255, 0.2)"
                      : "rgba(0,0,0,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = isDarkMode
                      ? "rgba(255, 255, 255, 0.1)"
                      : "transparent";
                  }}
                />
              )}
            </>
          ) : (
            <NavLink to="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0 }}
                className="px-3 py-1 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-semibold shadow-md shadow-cyan-400/30 hover:shadow-xl transition-all duration-300 flex items-center gap-2 text-sm"
              >
                <LoginOutlined /> Login
              </motion.button>
            </NavLink>
          )}
        </div>
      </div>

      {/* Mobile Sidebar Drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <Drawer
            title={null}
            placement="left"
            closable={false}
            onClose={() => setSidebarOpen(false)}
            open={sidebarOpen}
            key="sidebar-drawer"
            bodyStyle={{ padding: 0 }}
            headerStyle={{ display: "none" }}
            drawerStyle={{ backgroundColor: "#191919" }}
            maskStyle={{ backgroundColor: "rgba(0,0,0,0.7)" }}
          >
            {sidebarContent}
          </Drawer>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
