import React, { use } from "react";
import Banner from "./Banner/Banner";
import LatestsortedData from "../../components/LatestItems/LatestItems";
import Testimonial from "../Testimonial/Testimonial";
import FAQ from "./FAQ/FAQ";
import { AuthContext } from "../../context/AuthContext";

const Home = () => {
  const { isDarkMode } = use(AuthContext);
  return (
    <div>
      <Banner></Banner>
      <LatestsortedData></LatestsortedData>
      <Testimonial></Testimonial>
      <div
        className={`pt-9 pb-5 ${
          isDarkMode
            ? "bg-[#222831]"
            : "bg-[linear-gradient(to_right,_#021C33,_#013F58,_#001D35)]"
        }`}
      >
        <FAQ />
      </div>
    </div>
  );
};

export default Home;
