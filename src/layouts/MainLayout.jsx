import React from "react";
import Navbar from "../components/Navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer/Footer";

const MainLayout = () => {
  const location = useLocation();
  const conditionalPadding = location.pathname !== "/" ? "py-5 pt-14 md:pt-28" : "";
  return (
    <div className="">
      <div>
        <Navbar></Navbar>
      </div>
      <div
        className={`bg-[linear-gradient(to_right,_#021C33,_#013F58,_#001D35)] ${conditionalPadding}`}
      >
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
