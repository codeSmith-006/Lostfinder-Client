import React, { use, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { motion, AnimatePresence } from "motion/react";
import { AuthContext } from "../../context/AuthContext";
import {
  Star,
  Heart,
  Quote,
  Calendar,
  CheckCircle,
  Sparkles,
  Users,
} from "lucide-react";

const Testimonial = () => {
  const { isDarkMode } = use(AuthContext);
  const [activeSlide, setActiveSlide] = useState(0);

  // responsive breakpoint
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
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
        "I thought I'd never see my wallet again. Thanks to this amazing platform, I got it back within a day. Truly life-saving!",
      date: "May 21, 2025",
      avatar: "https://i.ibb.co/B5PrJ7MR/male-2.jpg",
      rating: 5,
    },
    {
      id: 2,
      name: "Sadia Rahman",
      item: "Student ID Card",
      quote:
        "Someone found my ID card and returned it the next day. The process was smooth and felt secure.",
      date: "April 12, 2025",
      avatar: "https://i.ibb.co/8nXq8p7x/female-4.jpg",
      rating: 5,
    },
    {
      id: 3,
      name: "Nabil Chowdhury",
      item: "Bluetooth Headphones",
      quote:
        "Can't believe someone found my headphones and returned them! Super thankful for this platform.",
      date: "March 30, 2025",
      avatar: "https://i.ibb.co/G4z1Txwg/male-1.webp",
      rating: 5,
    },
    {
      id: 4,
      name: "Priya Sharma",
      item: "Passport",
      quote:
        "I was panicking about my lost passport, but someone returned it through this app. Unbelievable!",
      date: "March 15, 2025",
      avatar: "https://i.ibb.co/fJmnftr/female-5.webp",
      rating: 5,
    },
    {
      id: 5,
      name: "Tanvir Hossain",
      item: "Backpack",
      quote:
        "This platform really works. I got my lost backpack back within 3 days. Hats off to the team!",
      date: "May 02, 2025",
      avatar: "https://i.ibb.co/4ng8D5Rf/male-5.jpg",
      rating: 5,
    },
    {
      id: 6,
      name: "Emily Chen",
      item: "Kindle Reader",
      quote:
        "Lost it in a coffee shop and thought it was gone forever. Got it back through this community. Amazing!",
      date: "April 08, 2025",
      avatar: "https://i.ibb.co/p6dzD9Cg/female-2.webp",
      rating: 5,
    },
    {
      id: 7,
      name: "Hasan Mahmud",
      item: "Laptop",
      quote:
        "Never expected my lost laptop to return, but someone actually found it and contacted me through here!",
      date: "March 28, 2025",
      avatar: "https://i.ibb.co/NdkF0MDk/male-3.jpg",
      rating: 5,
    },
    {
      id: 8,
      name: "Lina Gomez",
      item: "Gold Earrings",
      quote:
        "Lost a small jewelry box during a trip. Was shocked when someone posted about finding it. Thank you!",
      date: "May 10, 2025",
      avatar: "https://i.ibb.co/V8x3St1/female-3.jpg",
      rating: 5,
    },
    {
      id: 9,
      name: "Arif Ullah",
      item: "National ID",
      quote:
        "Recovered my NID card just in time for an important document process. Super grateful!",
      date: "April 20, 2025",
      avatar: "https://i.ibb.co/tM2tXtVc/male-4.jpg",
      rating: 5,
    },
    {
      id: 10,
      name: "Mehjabin Aktar",
      item: "Medical Report File",
      quote:
        "Someone returned my important reports that I had forgotten at a clinic. This platform really works!",
      date: "May 05, 2025",
      avatar: "https://i.ibb.co/fYgqz3CX/female-1.jpg",
      rating: 5,
    },
  ];

  return (
    <div
      id="success-stories"
      className={`relative pb-16 pt-16 overflow-hidden ${
        isDarkMode
          ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
          : "bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900"
      }`}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-teal-400/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 50,
            }}
            animate={{
              y: -50,
              x: Math.random() * window.innerWidth,
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 relative z-10"
      >
        <motion.div
          className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-teal-400/10 backdrop-blur-sm rounded-full border border-teal-400/20"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Users className="w-5 h-5 text-teal-400" />
          <span className="text-teal-300 font-medium text-sm">
            Success Stories
          </span>
        </motion.div>

        <motion.h2
          className="text-4xl md:text-5xl font-bold text-white mb-6 flex items-center justify-center gap-4"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Star className="w-8 h-8 text-yellow-400 fill-current" />
          </motion.div>

          <span className="bg-gradient-to-r from-white via-teal-200 to-cyan-300 bg-clip-text text-transparent">
            Success Stories
          </span>

          <motion.div
            animate={{
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          >
            <Heart className="w-8 h-8 text-pink-500 fill-current" />
          </motion.div>
        </motion.h2>

        <motion.p
          className="text-gray-300 text-lg max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Real stories from real people who found their lost items through our
          community
        </motion.p>

        <div className="w-32 h-1 bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 mx-auto mt-6 rounded-full"></div>
      </motion.div>

      {/* Testimonial Carousel */}
      <div className="relative z-10 px-4">
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={4000}
          keyBoardControl={true}
          customTransition="transform 0.5s ease-in-out"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style !mt-12"
          itemClass="px-3"
          beforeChange={(nextSlide) => setActiveSlide(nextSlide)}
          showDots={true}
          renderDotsOutside={true}
          customDot={<CustomDot />}
        >
          {testimonialsData.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
              isActive={index === activeSlide}
            />
          ))}
        </Carousel>
      </div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mt-20 text-center relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto px-4">
          {[
            { number: "10K+", label: "Items Recovered", icon: CheckCircle },
            { number: "25K+", label: "Happy Users", icon: Users },
            { number: "98%", label: "Success Rate", icon: Star },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              <stat.icon className="w-10 h-10 text-teal-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-gray-300">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

// Custom Dot Component
const CustomDot = ({ onClick, ...rest }) => {
  const { active } = rest;
  return (
    <button
      className={`w-3 h-3 rounded-full mx-1 transition-all duration-300 ${
        active ? "bg-teal-400 scale-125" : "bg-white/30 hover:bg-white/50"
      }`}
      onClick={() => onClick()}
    />
  );
};

// Individual Testimonial Card Component
const TestimonialCard = ({ testimonial, index, isActive }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative bg-gradient-to-br from-slate-800/80 via-slate-700/60 to-slate-800/90 backdrop-blur-xl border border-slate-600/50 rounded-3xl p-6 mt-5 h-auto shadow-xl transition-all duration-500 group hover:shadow-2xl hover:shadow-teal-400/20 hover:border-teal-400/30 ${
        isActive ? "scale-105 shadow-teal-400/30" : ""
      }`}
    >
      {/* Background Glow Effect */}
      <motion.div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-cyan-500/5 to-blue-600/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Quote Icon */}
      <motion.div
        className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full flex items-center justify-center shadow-lg"
        whileHover={{ rotate: 180, scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        <Quote className="w-4 h-4 text-white" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10">
        {/* User Info */}
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            className="relative"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-teal-400/30 shadow-lg">
              <motion.img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-full h-full object-cover"
                onLoad={() => setImageLoaded(true)}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{
                  scale: imageLoaded ? 1 : 1.2,
                  opacity: imageLoaded ? 1 : 0,
                }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <motion.div
              className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-slate-800 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              <CheckCircle className="w-3 h-3 text-white" />
            </motion.div>
          </motion.div>

          <div className="flex-1">
            <h4 className="font-bold text-white text-lg group-hover:text-teal-300 transition-colors duration-300">
              {testimonial.name}
            </h4>
            <p className="text-teal-300 text-sm font-medium bg-teal-900/30 px-2 py-1 rounded-full inline-block">
              Found: {testimonial.item}
            </p>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-4">
          {[...Array(testimonial.rating || 5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.1 * i, type: "spring", stiffness: 200 }}
            >
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
            </motion.div>
          ))}
        </div>

        {/* Testimonial Quote */}
        <motion.blockquote
          className="text-gray-200 text-sm leading-relaxed mb-4 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          "{testimonial.quote}"
        </motion.blockquote>

        {/* Date */}
        <motion.div
          className="flex items-center gap-2 text-xs text-gray-400"
          whileHover={{ x: 3 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Calendar className="w-3 h-3 text-teal-400" />
          {new Date(testimonial.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-4 right-4 opacity-20"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <Sparkles className="w-5 h-5 text-teal-400" />
      </motion.div>
    </motion.div>
  );
};

// Custom Styles (add to your global CSS)
const customStyles = `
.carousel-container {
  padding-bottom: 50px;
}

.custom-dot-list-style {
  bottom: -20px;
  text-align: center;
}

.custom-dot-list-style li {
  display: inline-block;
  margin: 0 4px;
}

.react-multi-carousel-dot--active button {
  background: #14b8a6 !important;
  transform: scale(1.2);
}

.react-multi-carousel-dot button {
  border: none;
  outline: none;
  cursor: pointer;
}

.react-multiple-carousel__arrow {
  background: rgba(20, 184, 166, 0.2) !important;
  border: 1px solid rgba(20, 184, 166, 0.3) !important;
  color: #14b8a6 !important;
  backdrop-filter: blur(10px);
  border-radius: 50% !important;
  width: 50px !important;
  height: 50px !important;
  min-width: 50px !important;
  min-height: 50px !important;
}

.react-multiple-carousel__arrow:hover {
  background: rgba(20, 184, 166, 0.3) !important;
  transform: scale(1.1);
}

.react-multiple-carousel__arrow::before {
  font-size: 18px !important;
  font-weight: bold !important;
}
`;

// Inject styles
if (typeof document !== "undefined") {
  const styleElement = document.createElement("style");
  styleElement.textContent = customStyles;
  document.head.appendChild(styleElement);
}

export default Testimonial;
