import React, { use } from "react";
import Banner from "./Banner/Banner";
import LatestsortedData from "../../components/LatestItems/LatestItems";
import Testimonial from "../Testimonial/Testimonial";
import FAQ from "./FAQ/FAQ";
import { AuthContext } from "../../context/AuthContext";
import BlogSection from "../../components/BlogSection/BlogSection";

const Home = () => {
  const { isDarkMode } = use(AuthContext);
  return (
    <div>
      <Banner></Banner>
      <LatestsortedData></LatestsortedData>
      <Testimonial></Testimonial>
      <BlogSection></BlogSection>
      <div>
        <FAQ />
      </div>
    </div>
  );
};

export default Home;
