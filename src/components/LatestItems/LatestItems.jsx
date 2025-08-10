import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import axios from "axios";
import { motion, AnimatePresence } from "motion/react";
import {
  Tag,
  Calendar,
  Layers,
  MapPin,
  Eye,
  ArrowRight,
  Clock,
  Sparkles,
  Package,
} from "lucide-react";

const LatestsortedData = () => {
  // loading
  const [loading, setLoading] = useState(true);
  const [sortedData, setSortedData] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  // navigating
  const navigate = useNavigate();

  // fetching sorted data from api
  useEffect(() => {
    const fetchedData = async () => {
      try {
        const response = await axios.get(
          "https://lostfinder-server.vercel.app/latestItems"
        );
        setSortedData(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Error while fetching data: ", error);
      }
    };

    fetchedData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Yesterday";
    if (diffDays <= 7) return `${diffDays} days ago`;

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div id="latest-items" className="mt-12 pb-5 px-5">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <motion.h2
          className="text-3xl font-bold text-white mb-3 flex items-center justify-center gap-3"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.div
            whileHover={{ rotate: 360, scale: 1.2 }}
            transition={{ duration: 0.8 }}
          >
            <Package className="w-8 h-8 text-teal-400" />
          </motion.div>
          Latest Find & Lost Items
        </motion.h2>
        <div className="w-24 h-1 bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 mx-auto rounded-full"></div>
      </motion.div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedData.map((item, index) => (
          <ItemCard
            key={item._id}
            item={item}
            index={index}
            navigate={navigate}
            formatDate={formatDate}
            isHovered={hoveredCard === item._id}
            setHovered={setHoveredCard}
          />
        ))}
      </div>

      {/* See All Button */}
      <motion.div
        className="text-center mt-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <motion.button
          onClick={() => navigate("/allItems")}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 15px 35px rgba(6, 182, 212, 0.4)",
          }}
          whileTap={{ scale: 0.98 }}
          className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-white font-bold bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 shadow-lg hover:shadow-cyan-500/40 transition-all duration-300 overflow-hidden"
        >
          {/* Button Background Animation */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-teal-300 via-cyan-400 to-blue-400"
            initial={{ x: "-100%" }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
          />

          <span className="relative z-10 flex items-center gap-3">
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
            See All Items
          </span>

          {/* Shimmer effect */}
          <motion.div
            className="absolute top-0 left-0 w-8 h-full bg-white/30 skew-x-12 blur-sm"
            animate={{
              x: ["-100%", "400%"],
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 3,
            }}
          />
        </motion.button>
      </motion.div>
    </div>
  );
};

// Individual Item Card Component
const ItemCard = ({
  item,
  index,
  navigate,
  formatDate,
  isHovered,
  setHovered,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setHovered(item._id)}
      onHoverEnd={() => setHovered(null)}
      className="group relative bg-gradient-to-br from-slate-900/80 via-slate-800/60 to-slate-900/90 backdrop-blur-xl border border-slate-700/50 shadow-2xl rounded-3xl p-6 transition-all duration-500 hover:border-teal-400/30 hover:shadow-teal-400/20 overflow-hidden flex flex-col h-full"
    >
      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-cyan-500/5 to-blue-600/5 rounded-3xl"
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Floating Particles */}
      <AnimatePresence>
        {isHovered && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-teal-400/60 rounded-full"
                initial={{
                  opacity: 0,
                  scale: 0,
                  x: Math.random() * 300,
                  y: Math.random() * 400,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  y: -50,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Infinity,
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Post Type Badge */}
      {item?.postType && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="absolute top-4 right-4 z-20"
        >
          <div className="relative">
            <div className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg backdrop-blur-sm border border-white/20 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {item.postType}
            </div>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full blur-md opacity-50"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      )}

      {/* Thumbnail with Enhanced Effects */}
      {item?.thumbnail && (
        <motion.div
          className="relative overflow-hidden rounded-2xl group/image mb-4"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative h-64 w-full overflow-hidden rounded-2xl">
            <motion.img
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-full object-cover transition-all duration-700"
              style={{
                filter: isHovered
                  ? "brightness(1.1) saturate(1.2)"
                  : "brightness(1) saturate(1)",
              }}
              onLoad={() => setImageLoaded(true)}
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{
                scale: imageLoaded ? 1 : 1.1,
                opacity: imageLoaded ? 1 : 0,
              }}
              transition={{ duration: 0.5 }}
            />

            {/* Image Overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
              animate={{
                opacity: isHovered ? 0.8 : 0.3,
              }}
              transition={{ duration: 0.3 }}
            />

            {/* Shimmer Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
              animate={{
                x: isHovered ? "100%" : "-100%",
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}

      {/* Content Section - Fixed Height Layout */}
      <div className="relative z-10 flex flex-col">
        {/* Title - Fixed Height */}
        <div className="mb-5 flex items-start">
          <motion.h3
            className="text-lg font-bold text-white flex items-center gap-2 group-hover:text-teal-300 transition-colors duration-300 line-clamp-2 leading-tight"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              whileHover={{ rotate: 360, scale: 1.2 }}
              transition={{ duration: 0.5 }}
              className="flex-shrink-0"
            >
              <Tag className="w-4 h-4 text-teal-400 mt-0.5" />
            </motion.div>
            <span className="line-clamp-2">{item?.title}</span>
          </motion.h3>
        </div>

        {/* Info Grid - Flexible Height */}
        <div className="flex flex-col ">
          {/* Date */}
          {item?.date && (
            <motion.div
              className="flex items-center gap-2 text-sm group/item"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                className="flex-shrink-0"
              >
                <Calendar className="w-4 h-4 text-teal-400 group-hover/item:text-cyan-300 transition-colors duration-200" />
              </motion.div>
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-medium text-gray-300 text-xs">
                  Posted:
                </span>
                <span className="text-white font-semibold text-sm">
                  {formatDate(item.date)}
                </span>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex-shrink-0"
                >
                  <Clock className="w-3 h-3 text-teal-300 opacity-60" />
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Category */}
          {item?.category && (
            <motion.div
              className="flex items-center gap-2 text-sm group/item"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                className="flex-shrink-0"
              >
                <Layers className="w-4 h-4 text-teal-400 group-hover/item:text-cyan-300 transition-colors duration-200" />
              </motion.div>
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-medium text-gray-300 text-xs">
                  Category:
                </span>
                <span className="text-white font-semibold bg-slate-800/50 px-2 py-1 rounded-lg border border-slate-600/50 text-xs">
                  {item.category}
                </span>
              </div>
            </motion.div>
          )}

          {/* Location */}
          {item?.location && (
            <motion.div
              className="flex items-start gap-2 text-sm group/item"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                className="flex-shrink-0 mt-0.5"
              >
                <MapPin className="w-4 h-4 text-teal-400 group-hover/item:text-cyan-300 transition-colors duration-200" />
              </motion.div>
              <div className="flex flex-row gap-1 min-w-0">
                <span className="font-medium text-gray-300 text-xs">
                  Location:
                </span>
                <span className="text-white font-semibold text-sm leading-tight break-words">
                  {item.location}
                </span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Action Button - Fixed Position */}
        <motion.div
          className="pt-3"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.button
            onClick={() => navigate(`/allItems/${item?._id}`)}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 8px 25px rgba(6, 182, 212, 0.3)",
            }}
            whileTap={{ scale: 0.98 }}
            className="group/button relative w-full bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 hover:from-cyan-400 hover:via-teal-400 hover:to-blue-500 text-white font-semibold py-2.5 px-4 rounded-xl shadow-lg transition-all duration-300 overflow-hidden"
          >
            {/* Button Background Animation */}
            <motion.div
              className="absolute inset-0 mt-4 bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Button Content */}
            <span className="relative z-10 mt4 flex items-center justify-center gap-2 text-sm">
              <Eye className="w-4 h-4 group-hover/button:scale-110 transition-transform duration-200" />
              <span>View Details</span>
              <motion.div
                animate={{ x: isHovered ? 3 : 0 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </span>

            {/* Shimmer effect */}
            <motion.div
              className="absolute top-0 left-0 w-8 h-full bg-white/30 skew-x-12 blur-sm"
              animate={{
                x: isHovered ? "400%" : "-100%",
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
          </motion.button>
        </motion.div>
      </div>

      {/* Corner Decorations */}
      <motion.div
        className="absolute top-6 left-6 w-8 h-8 border-l-2 border-t-2 border-teal-400/30 rounded-tl-lg"
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.5,
        }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="absolute bottom-6 right-6 w-8 h-8 border-r-2 border-b-2 border-teal-400/30 rounded-br-lg"
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.5,
        }}
        transition={{ duration: 0.3, delay: 0.1 }}
      />
    </motion.div>
  );
};

export default LatestsortedData;
