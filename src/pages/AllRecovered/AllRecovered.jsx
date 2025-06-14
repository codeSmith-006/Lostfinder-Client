import React, { useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../../components/Loading/Loading";
import axiosSecure from "../../components/hooks/axiosSecure";

const AllRecovered = () => {
  // all recovered data
  const [usersPost, setUsersPost] = useState([]);

  // layout
  const [layout, setLayout] = useState("grid");

  // fetching allRecovered data
  useEffect(() => {
    const fetchAllRecovered = async () => {
      try {
        const response = await axiosSecure.get('/allRecovered');
        setUsersPost(response.data);
      } catch (error) {
        console.log("Error when fetching allRecovered: ", error);
      }
    };

    // calling fetchAllRecovered();
    fetchAllRecovered();
    
  }, []);

  console.log(usersPost)


  // handle grid icon click
  const handleGrid = () => {
    setLayout("grid");
    localStorage.setItem("layout", "grid");
  };

  // handle table icon click
  const handleTable = () => {
    setLayout("table");
    localStorage.setItem("layout", "table");
  };

  useEffect(() => {
    const localLayout = localStorage.getItem("layout");
    setLayout(localLayout);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg text-gray-800 space-y-6">
      <h2 className="text-3xl font-semibold text-center text-teal-600 mb-6">
        My Recovered Items
      </h2>

      {/* layout toggle */}
      <div className="flex justify-end items-center gap-4 -mt-4 mb-2 pr-2">
        <button
          onClick={handleGrid}
          className={`text-gray-500 ${
            layout == "grid" ? "text-teal-500" : ""
          } hover:text-teal-500 transition text-xl`}
          title="Grid View"
        >
          <i className="fas fa-th"></i>
        </button>
        <button
          onClick={handleTable}
          className={`text-gray-500 ${
            layout == "table" ? "text-teal-500" : ""
          } hover:text-teal-500 transition text-xl`}
          title="Table View"
        >
          <i className="fas fa-table"></i>
        </button>
      </div>

      {/* according to layout */}
      {layout == "table" ? (
        usersPost?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow-md">
              <thead className="bg-teal-50 text-teal-700">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-semibold">
                    Title
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">
                    Category
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">
                    Location
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">
                    Recovered On
                  </th>
                </tr>
              </thead>
              <tbody>
                {usersPost.map((item, index) => (
                  <tr
                    key={item.id || index}
                    className="hover:bg-teal-50 transition-colors border-t"
                  >
                    <td className="py-3 px-4 text-gray-800 font-medium">
                      {item.recoveredTitle}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {item.recoveredCategory}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {item.recoveredLocation}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {new Date(item.recoveredDate).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <i className="fas fa-box-open text-4xl text-teal-300 mb-4"></i>
            <p className="text-lg font-medium">
              You haven’t recovered any items yet.
            </p>
            <p className="text-sm">
              Recovered items will appear here once you submit them.
            </p>
          </div>
        )
      ) : usersPost?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {usersPost.map((item, index) => (
            <div
              key={item.id || index}
              className="bg-white rounded-xl shadow-md p-4 space-y-2 hover:shadow-lg transition duration-300"
            >
              <h3 className="text-lg font-semibold text-teal-600">
                <i className="fas fa-tag mr-2 text-teal-400"></i>
                {item.recoveredTitle}
              </h3>
              <p className="text-sm text-gray-600">
                <i className="fas fa-layer-group mr-1 text-teal-400"></i>
                <span className="font-medium">Category:</span>{" "}
                {item.recoveredCategory}
              </p>
              <p className="text-sm text-gray-600">
                <i className="fas fa-map-marker-alt mr-1 text-teal-400"></i>
                <span className="font-medium">Location:</span>{" "}
                {item.recoveredLocation}
              </p>
              <p className="text-sm text-gray-600">
                <i className="fas fa-calendar-day mr-1 text-teal-400"></i>
                <span className="font-medium">Recovered On:</span>{" "}
                {new Date(item.recoveredDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <i className="fas fa-box-open text-4xl text-teal-300 mb-4"></i>
          <p className="text-lg font-medium">
            You haven’t recovered any items yet.
          </p>
          <p className="text-sm">
            Recovered items will appear here once you submit them.
          </p>
        </div>
      )}
    </div>
  );
};

export default AllRecovered;
