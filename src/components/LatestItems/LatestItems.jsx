import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import axios from "axios";
import SpotlightCard from "../SpotlightCard/SpotlightCard";

const LatestsortedData = () => {
  // loading
  const [loading, setLoading] = useState(true);
  const [sortedData, setSortedData] = useState([]);
  console.log("Sorted data: ", sortedData[0]);
  // navigating
  const navigate = useNavigate();

  // fetching sorted data from api
  useEffect(() => {
    const fetchedData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/latestItems");
        setSortedData(response.data);
        setLoading(false);
        console.log(response.data);
      } catch (error) {
        console.log("Error while fetching data: ", error);
      }
    };

    fetchedData();
  }, []);

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="mt-12 pb-5 px-5">
      <h2 className="text-2xl font-bold text-teal-400 hover:text-gray-200 transition-colors duration-300 mb-8 text-center">
        <i className="fas fa-box-open text-teal-500 mr-2"></i>
        Latest Find & Lost Items
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {sortedData.map((item) => (
          <div
            key={item._id}
            className="group relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-lg shadow-xl transition-all duration-300 hover:shadow-2xl hover:ring-2 hover:ring-teal-400/50"
          >
            {/* Thumbnail */}
            <img
              src={item.thumbnail}
              alt={item.title}
              className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Content */}
            <div className="p-5 space-y-3">
              <h3 className="text-xl font-semibold text-white">
                <i className="fas fa-tag text-teal-300 mr-2"></i>
                {item.title}
              </h3>

              <p className="text-sm text-gray-300">
                <i className="fas fa-calendar-alt text-teal-200 mr-2"></i>
                <span className="font-medium text-white">
                  {item.date
                    ? new Date(item.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "N/A"}
                </span>
              </p>

              <p className="text-sm text-gray-300">
                <i className="fas fa-map-marker-alt text-teal-200 mr-2"></i>
                <span className="font-medium text-white">{item.location}</span>
              </p>

              <div className="pt-2">
                <button
                  onClick={() => navigate(`/allItems/${item?._id}`)}
                  className="w-full cursor-pointer inline-block bg-gradient-to-r from-cyan-500 to-blue-700 hover:from-cyan-600 hover:to-blue-800 transition-colors text-white font-medium py-2 rounded-xl text-sm shadow"
                >
                  <i className="fas fa-eye mr-1"></i> View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* See All Button */}
      <div className="text-center mt-12">
        <button
          onClick={() => navigate("/allItems")}
          className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-white font-semibold bg-gradient-to-r cursor-pointer from-teal-400 via-cyan-500 to-blue-500 shadow-md shadow-cyan-500/30 hover:shadow-xl hover:brightness-110 transition-all duration-300 ease-in-out"
        >
          <i className="fas fa-arrow-right animate-pulse"></i>
          See All
        </button>
      </div>
    </div>
  );
};

export default LatestsortedData;
