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
      <h2 className="text-2xl font-bold text-gray-300 hover:text-white transition-color duration-300  mb-6 text-center">
        <i className="fas fa-box-open text-teal-500 mr-2"></i>
        Latest Find & Lost Items
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {sortedData.map((item) => (
            <div
              key={item._id}
              className="bg-transparent backdrop-blur-md  rounded-2xl shadow-md overflow-hidden transition transform hover:-translate-y-1 hover:shadow-lg duration-300"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  <i className="fas fa-tag text-teal-500 mr-1"></i>
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">
                  <i className="fas fa-calendar-alt text-teal-400 mr-1"></i>
                  Date:{" "}
                  <span className="font-medium">
                    {item.date
                      ? new Date(item.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "N/A"}
                  </span>
                </p>
                <p className="text-sm text-gray-600">
                  <i className="fas fa-map-marker-alt text-teal-400 mr-1"></i>
                  Location: <span className="font-medium">{item.location}</span>
                </p>
                <button
                  onClick={() => navigate(`/allItems/${item?._id}`)}
                  className="mt-2 cursor-pointer inline-block bg-teal-500 text-white px-4 py-1.5 rounded-lg hover:bg-teal-600 transition"
                >
                  <i className="fas fa-eye mr-1"></i> View Details
                </button>
              </div>
            </div>

        ))}
      </div>

      {/* See All Button */}
      <div className="text-center mt-8">
        <button
          onClick={() => navigate("/allItems")}
          className="bg-teal-500 cursor-pointer text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition"
        >
          <i className="fas fa-arrow-right mr-1"></i> See All
        </button>
      </div>
    </div>
  );
};

export default LatestsortedData;
