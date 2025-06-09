import React from "react";
import { NavLink } from "react-router";

const Error = () => {
  return (
    <div class="relative h-screen bg-[url('https://i.ibb.co.com/fV3m05sg/error-page.png')] bg-cover bg-center bg-no-repeat flex justify-center">
      <NavLink
        to="/"
        className="btn bg-[#38A57C] text-white mt-28 hover:bg-[#2e8666] border-none"
      >
        ← Back to Home
      </NavLink>
    </div>
  );
};

export default Error;
