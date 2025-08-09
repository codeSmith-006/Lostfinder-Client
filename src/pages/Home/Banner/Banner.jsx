import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
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
    <div id="home" className="w-full h-[100vh] relative">
      <Swiper
        modules={[Navigation, Autoplay]}
        loop
        autoplay={{ delay: 3000 }}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <SlideHero slide={slide} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

const SlideHero = ({ slide }) => (
  <div
    className="relative h-[100vh] w-full bg-cover bg-center"
    style={{ backgroundImage: `url(${slide.image})` }}
  >
    {/* Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
    <div className="absolute -z-0 inset-0 bg-gradient-to-b from-black/80 via-black/30 to-transparent"></div>

    {/* Content */}
    <motion.div
      className="absolute bottom-36 md:bottom-44 left-6 sm:left-16 max-w-xl p-8 md:bg-white/10 md:backdrop-blur-sm rounded-lg md:border md:border-white/30 text-white md:shadow-lg"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h2
        className="text-3xl sm:text-5xl font-bold leading-tight"
      >
        {slide.title}
      </h2>
      <p className="mt-3 text-base sm:text-lg drop-shadow-md">
        {slide.subtitle}
      </p>
      <Link to={slide.buttonLink}>
        <motion.button
          whileHover={{
            scale: 1.01,
            boxShadow: "0 0 15px rgba(14, 165, 233, 0.8)",
          }}
          transition={{ duration: 0 }}
          className="mt-6 cursor-pointer px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-semibold rounded shadow-md hover:shadow-cyan-400/60 transition-all duration-500"
          style={{
            backgroundSize: "200% 200%",
            backgroundPosition: "0% 50%",
            animation: "gradientShift 4s ease infinite",
          }}
        >
          {slide.buttonText}
        </motion.button>
      </Link>
    </motion.div>

    {/* bouncing arrow */}
    <div className="z-40 absolute bottom-12 right-6 md:right-12 md:bottom-24 " >
      <BouncingArrow></BouncingArrow>
    </div>
  </div>
);
