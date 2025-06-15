import React from "react";
import Banner from "./Banner/Banner";
import LatestsortedData from "../../components/LatestItems/LatestItems";
import Testimonial from "../Testimonial/Testimonial";
import FAQ from "./FAQ/FAQ";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <LatestsortedData></LatestsortedData>
      <div className="bg-[linear-gradient(to_right,_#021C33,_#013F58,_#001D35)] pt-9">
        <Testimonial></Testimonial>
      </div>
      <div className="bg-[linear-gradient(to_right,_#021C33,_#013F58,_#001D35)] pt-9 pb-5">
        <FAQ></FAQ>
      </div>
    </div>
  );
};

export default Home;
