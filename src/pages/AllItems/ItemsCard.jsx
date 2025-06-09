import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from "react-router-dom";

const ItemsCard = ({ data }) => {
    
  return (
    <div className="bg-white border border-gray-200 shadow-lg rounded-2xl p-5 space-y-3 transition-transform hover:scale-[1.02] relative">
      {/* Post Type Badge */}
      <span className="absolute top-4 right-4 bg-teal-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
        {data?.postType}
      </span>

      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
        <i className="fas fa-tag text-teal-500"></i>
        {data?.title}
      </h3>

      {/* Category */}
      <p className="text-sm text-gray-600 flex items-center gap-2">
        <i className="fas fa-layer-group text-teal-400"></i>
        <span className="font-medium">Category:</span> {data?.category}
      </p>

      {/* Location */}
      <p className="text-sm text-gray-600 flex items-center gap-2">
        <i className="fas fa-map-marker-alt text-teal-400"></i>
        <span className="font-medium">Location:</span> {data?.location}
      </p>

      {/* View Details Button */}
      <div className="pt-3">
        <Link
          to={`/allItems/${data?._id}`}
          className="inline-block bg-teal-500 hover:bg-teal-600 transition-colors text-white font-medium px-4 py-2 rounded-full text-sm shadow"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ItemsCard;
