import React, { use } from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer/Footer";
// import { useAuth } from "../contexts/AuthProvider"; // adjust path as needed
import AuthProvider from "../context/AuthProvider";
import { AuthContext } from "../context/AuthContext";

const MainLayout = () => {
  const { isDarkMode, setIsDarkMode } = use(AuthContext);

  const location = useLocation();
  const conditionalPadding =
    location.pathname !== "/" ? "py-5 pt-14 md:pt-32" : "";

  return (
    <div className="">
      <div>
        <Navbar
          isDarkMode={isDarkMode}
          // darkToggle={toggleDark}
          setIsDarkMode={setIsDarkMode}
        />
      </div>
      <div className={`${conditionalPadding} relative`}>
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

        {isDarkMode && <div className="absolute inset-0 bg-[#222831] z-[-1]" />}

        <Outlet />
      </div>
      <Footer isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
    </div>
  );
};

export default MainLayout;
