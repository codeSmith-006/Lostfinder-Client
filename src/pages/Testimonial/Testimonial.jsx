import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import TestimonialCard from "./TestimonialCard";

const Testimonial = () => {
  // responsive breakpoint
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  // testimonials data
  const testimonialsData = [
    {
      id: 1,
      name: "Alex Johnson",
      item: "Wallet",
      quote:
        "I thought I’d never see my wallet again. Thanks to this amazing platform, I got it back within a day. Truly life-saving!",
      date: "May 21, 2025",
      avatar: "https://i.ibb.co/B5PrJ7MR/male-2.jpg",
    },
    {
      id: 2,
      name: "Sadia Rahman",
      item: "Student ID Card",
      quote:
        "Someone found my ID card and returned it the next day. The process was smooth and felt secure.",
      date: "April 12, 2025",
      avatar: "https://i.ibb.co/8nXq8p7x/female-4.jpg",
    },
    {
      id: 3,
      name: "Nabil Chowdhury",
      item: "Bluetooth Headphones",
      quote:
        "Can’t believe someone found my headphones and returned them! Super thankful for this platform.",
      date: "March 30, 2025",
      avatar: "https://i.ibb.co/G4z1Txwg/male-1.webp",
    },
    {
      id: 4,
      name: "Priya Sharma",
      item: "Passport",
      quote:
        "I was panicking about my lost passport, but someone returned it through this app. Unbelievable!",
      date: "March 15, 2025",
      avatar: "https://i.ibb.co/fJmnftr/female-5.webp",
    },
    {
      id: 5,
      name: "Tanvir Hossain",
      item: "Backpack",
      quote:
        "This platform really works. I got my lost backpack back within 3 days. Hats off to the team!",
      date: "May 02, 2025",
      avatar: "https://i.ibb.co/4ng8D5Rf/male-5.jpg",
    },
    {
      id: 6,
      name: "Emily Chen",
      item: "Kindle Reader",
      quote:
        "Lost it in a coffee shop and thought it was gone forever. Got it back through this community. Amazing!",
      date: "April 08, 2025",
      avatar: "https://i.ibb.co/p6dzD9Cg/female-2.webp",
    },
    {
      id: 7,
      name: "Hasan Mahmud",
      item: "Laptop",
      quote:
        "Never expected my lost laptop to return, but someone actually found it and contacted me through here!",
      date: "March 28, 2025",
      avatar: "https://i.ibb.co/NdkF0MDk/male-3.jpg",
    },
    {
      id: 8,
      name: "Lina Gomez",
      item: "Gold Earrings",
      quote:
        "Lost a small jewelry box during a trip. Was shocked when someone posted about finding it. Thank you!",
      date: "May 10, 2025",
      avatar: "https://i.ibb.co/V8x3St1/female-3.jpg",
    },
    {
      id: 9,
      name: "Arif Ullah",
      item: "National ID",
      quote:
        "Recovered my NID card just in time for an important document process. Super grateful!",
      date: "April 20, 2025",
      avatar: "https://i.ibb.co/tM2tXtVc/male-4.jpg",
    },
    {
      id: 10,
      name: "Mehjabin Aktar",
      item: "Medical Report File",
      quote:
        "Someone returned my important reports that I had forgotten at a clinic. This platform really works!",
      date: "May 05, 2025",
      avatar: "https://i.ibb.co/fYgqz3CX/female-1.jpg",
    },
  ];

  return (
    <div id="success-stories" className="pb-5">
      <h2 className="text-3xl px-3 font-bold text-teal-400 text-center mb-8 flex items-center justify-center gap-3">
        <i className="fas fa-star text-yellow-400"></i>
        Success Stories from Our Users
        <i className="fas fa-heart text-pink-500"></i>
      </h2>

      <Carousel
        swipeable={false}
        draggable={false}
        showDots={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={2000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={1000}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {testimonialsData.map((testimonial) => (
          <TestimonialCard testimonial={testimonial}></TestimonialCard>
        ))}
      </Carousel>
    </div>
  );
};

export default Testimonial;
