import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import BouncingArrow from "../../../components/BouncingArrow/BouncingArrow";

const slides = [
  {
    title: "Lost Something Valuable?",
    subtitle: "We help you reconnect with your lost items faster and easier.",
    image:
      "https://i.ibb.co/J6VXDtd/image-689a07c8d63423b3915868133291e8de-1024x572.jpg",
    buttonText: "Report Lost Item",
    buttonLink: "/addItems",
  },
  {
    title: "Found an Item?",
    subtitle: "Post it here and help someone find what they lost.",
    image: "https://i.ibb.co/MD5d5YjG/found-item.jpg",
    buttonText: "Post Found Item",
    buttonLink: "/addItems",
  },
  {
    title: "Safe & Verified Recovery",
    subtitle: "All recoveries are tracked and verified for safety and trust.",
    image: "https://i.ibb.co/gxFngj9/Verifyem-jpg.webp",
    buttonText: "View Recovery Process",
    buttonLink: "/allRecovered",
  },
];

export default function Banner() {
  return (
    <div id="home" className="w-full h-[100vh] relative overflow-hidden">
      <Swiper
        modules={[Navigation, Autoplay, Pagination, EffectFade]}
        loop
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={1000}
        navigation={{
          prevEl: ".swiper-button-prev-custom",
          nextEl: ".swiper-button-next-custom",
        }}
        pagination={{
          el: ".swiper-pagination-custom",
          clickable: true,
          bulletClass: "swiper-pagination-bullet-custom",
          bulletActiveClass: "swiper-pagination-bullet-active-custom",
        }}
        className="h-full group"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <SlideHero slide={slide} index={index} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation */}
      <div className="swiper-button-prev-custom absolute left-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all duration-300 opacity-0 group-hover:opacity-100">
        <ChevronLeft className="w-6 h-6 text-white" />
      </div>
      <div className="swiper-button-next-custom absolute right-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all duration-300 opacity-0 group-hover:opacity-100">
        <ChevronRight className="w-6 h-6 text-white" />
      </div>

      {/* Custom Pagination */}
      <div className="swiper-pagination-custom absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex space-x-3"></div>

      {/* Bouncing Arrow */}
      <div className="z-40 absolute bottom-12 right-6 md:right-12 md:bottom-24">
        <BouncingArrow />
      </div>
    </div>
  );
}

const SlideHero = ({ slide, index }) => (
  <div
    className="relative h-[100vh] w-full bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: `url(${slide.image})` }}
  >
    {/* Enhanced Overlay with Dark Top Shadow */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/40 to-black/70"></div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
    <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div>

    {/* Animated Content - Centered */}
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        className="text-center max-w-4xl mx-auto px-6 sm:px-8"
        initial={{ y: 80, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{
          duration: 1.2,
          delay: 0.2,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {/* Subtitle with modern styling */}
        {/* <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="inline-block mb-4"
        >
          <span className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium text-white/90 border border-white/20">
            {`0${index + 1}`} / {`0${slides.length}`}
          </span>
        </motion.div> */}

        {/* Main Title */}
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight text-white mb-6"
          style={{
            textShadow: "0 4px 20px rgba(0,0,0,0.5)",
            background: "linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {slide.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed"
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
        >
          {slide.subtitle}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <Link to={slide.buttonLink}>
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(14, 165, 233, 0.3)",
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-2xl hover:shadow-cyan-400/40 transition-all duration-500 overflow-hidden"
              style={{
                backgroundSize: "200% 200%",
                backgroundPosition: "0% 50%",
                animation: "gradientShift 6s ease infinite",
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                {slide.buttonText}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>

              {/* Button overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </motion.button>
          </Link>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          initial={{ scale: 0, rotate: 180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute top-4 left-4 w-16 h-16 border border-white/20 rounded-full opacity-30"
        ></motion.div>
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="absolute bottom-4 right-4 w-12 h-12 border border-white/20 rounded-full opacity-20"
        ></motion.div>
      </motion.div>
    </div>

    {/* Animated background particles */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white/10 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 50,
          }}
          animate={{
            y: -50,
            x: Math.random() * window.innerWidth,
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  </div>
);

// Add these styles to your global CSS
const styles = `
.swiper-pagination-bullet-custom {
  width: 12px;
  height: 12px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.swiper-pagination-bullet-custom::before {
  content: '';
  position: absolute;
  inset: 2px;
  background: transparent;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.swiper-pagination-bullet-active-custom {
  background: rgba(255, 255, 255, 0.9);
  transform: scale(1.2);
}

.swiper-pagination-bullet-active-custom::before {
  background: linear-gradient(45deg, #06b6d4, #3b82f6);
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
`;

// Inject styles
if (typeof document !== "undefined") {
  const styleElement = document.createElement("style");
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);
}
