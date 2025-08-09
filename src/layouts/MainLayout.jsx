import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Testimonial from "../pages/Testimonial/Testimonial";

const MainLayout = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Initialize from localStorage or default false
    const saved = localStorage.getItem("darkMode");
    return saved === "true" ? true : false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    // Save preference
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  const location = useLocation();
  const conditionalPadding =
    location.pathname !== "/" ? "py-5 pt-14 md:pt-32" : "";
  return (
    <div className="">
      <div>
        <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}></Navbar>
      </div>
      <div className={`${conditionalPadding} relative`}>
        {/* Light mode gradient background */}
        {!isDarkMode && (
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, #021C33, #013F58, #001D35)",
              zIndex: -1,
            }}
          />
        )}

        {/* Dark mode solid background */}
        {isDarkMode && (
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#121212] to-[#202020] z-[-1]" />
        )}

        <Outlet />
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
