import React, { useState } from "react";
import { Link } from "react-router-dom";
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
} from "lucide-react";

const ItemsCard = ({ data }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

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

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-gradient-to-br from-slate-900/80 via-slate-800/60 to-slate-900/90 backdrop-blur-xl border border-slate-700/50 shadow-2xl rounded-3xl p-5 space-y-3 transition-all duration-500 hover:border-teal-400/30 hover:shadow-teal-400/20 overflow-hidden flex flex-col h-full"
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
      {data?.postType && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="absolute top-4 right-4 z-20"
        >
          <div className="relative">
            <div className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg backdrop-blur-sm border border-white/20 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {data.postType}
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

      {/* Thumbnail with fixed height (h-48 = 12rem) */}
      {data?.thumbnail && (
        <motion.div
          className="relative overflow-hidden rounded-2xl group/image"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          style={{ height: "12rem" }} // exactly h-48
        >
          <motion.img
            src={data.thumbnail}
            alt={data.title}
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
        </motion.div>
      )}

      {/* Content Section with padding and spacing like simpler card */}
      <div className="relative z-10 flex flex-col flex-grow">
        {/* Title */}
        <motion.h3
          className="text-xl font-semibold text-white flex items-center gap-2"
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
          <span className="line-clamp-2">{data?.title}</span>
        </motion.h3>

        {/* Date */}
        {data?.date && (
          <motion.div
            className="flex items-center gap-2 text-sm"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              className="flex-shrink-0"
            >
              <Calendar className="w-4 h-4 text-teal-400 transition-colors duration-200" />
            </motion.div>
            <span className="font-medium text-white text-sm">
              {formatDate(data.date)}
            </span>
          </motion.div>
        )}

        {/* Category */}
        {data?.category && (
          <motion.div
            className="flex items-center gap-2 text-sm"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              className="flex-shrink-0"
            >
              <Layers className="w-4 h-4 text-teal-400 transition-colors duration-200" />
            </motion.div>
            <span className="font-medium text-white text-sm">
              {data.category}
            </span>
          </motion.div>
        )}

        {/* Location */}
        {data?.location && (
          <motion.div
            className="flex items-center gap-2 text-sm"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              className="flex-shrink-0"
            >
              <MapPin className="w-4 h-4 text-teal-400 transition-colors duration-200" />
            </motion.div>
            <span className="font-medium text-white text-sm">
              {data.location}
            </span>
          </motion.div>
        )}
      </div>

      {/* View Details Button with pt-2 padding like simpler card */}
      <div className="pt-2 px-5 w-full">
        <Link to={`/allItems/${data?._id}`}>
          <motion.button
            whileHover={{
              scale: 1.02,
              boxShadow: "0 8px 25px rgba(6, 182, 212, 0.3)",
            }}
            whileTap={{ scale: 0.98 }}
            className="relative w-full bg-gradient-to-r from-cyan-500 to-blue-700 hover:from-cyan-600 hover:to-blue-800 text-white font-medium py-2 rounded-xl text-sm shadow flex items-center justify-center gap-2 transition-colors overflow-hidden"
          >
            <Eye className="w-4 h-4" /> View Details
          </motion.button>
        </Link>
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

export default ItemsCard;
