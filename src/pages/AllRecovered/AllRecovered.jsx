import React, { useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../../components/Loading/Loading";
import axiosSecure from "../../components/hooks/axiosSecure";
import axios from "axios";
import Swal from "sweetalert2";
import { showToast } from "../../components/Toast/Toast";

const AllRecovered = () => {
  // all recovered data
  const [usersPost, setUsersPost] = useState([]);

  // layout
  const [layout, setLayout] = useState("grid");

  // fetching allRecovered data
  useEffect(() => {
    const fetchAllRecovered = async () => {
      try {
        const response = await axiosSecure.get("/allRecovered");
        setUsersPost(response.data);
      } catch (error) {
        console.log("Error when fetching allRecovered: ", error);
      }
    };

    // calling fetchAllRecovered();
    fetchAllRecovered();
  }, []);


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


  // handle delete
  const handleDelete = async (id) => {

    // target id
    const targetedId = id;

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // delete from ui
        const postAfterDelete = usersPost.filter(
          (singleData) => singleData._id !== id
        );
        setUsersPost(postAfterDelete);
		
		// delete  from database
        try {
          const result = await axiosSecure.delete("/allRecovered", {
            data: { targetedId },
          });

          if(result.data?.deletedCount) {
			showToast('success', 'Items successfully deleted')
		  }
        } catch (error) {
          console.log("Error while deleting the post: ", error);
        }
      }
    });

    // handling delete post in the database
  };

  return (
    <div className="max-w-4xl mx-auto p-6 backdrop-blur-md bg-transparent rounded-2xl shadow-lg text-gray-200 space-y-6">
      <h2 className="text-3xl font-semibold text-center text-cyan-400 mb-6">
        My Recovered Items
      </h2>

      {/* layout toggle */}
      <div className="flex justify-end items-center gap-4 -mt-4 mb-2 pr-2">
        <button
          onClick={handleGrid}
          className={`text-gray-300 ${
            layout == "grid" ? "text-cyan-400" : ""
          } hover:text-cyan-400 transition text-xl`}
          title="Grid View"
        >
          <i className="fas fa-th"></i>
        </button>
        <button
          onClick={handleTable}
          className={`${
            layout == "table" ? "text-cyan-400" : ""
          } text-gray-300 hover:text-cyan-400 transition text-xl`}
          title="Table View"
        >
          <i className="fas fa-table"></i>
        </button>
      </div>

      {/* layout views */}
      {layout == "table" ? (
        usersPost?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-transparent border border-gray-700 rounded-xl shadow-md">
              <thead className="bg-cyan-900 text-cyan-300">
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
                  <th className="py-3 px-4 text-left text-sm font-semibold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {usersPost.map((item, index) => (
                  <tr
                    key={item.id || index}
                    className="hover:bg-cyan-950 transition-colors border-t border-gray-700"
                  >
                    <td className="py-3 px-4 text-gray-100 font-medium">
                      {item.recoveredTitle}
                    </td>
                    <td className="py-3 px-4 text-gray-400">
                      {item.recoveredCategory}
                    </td>
                    <td className="py-3 px-4 text-gray-400">
                      {item.recoveredLocation}
                    </td>
                    <td className="py-3 px-4 text-gray-400">
                      {new Date(item.recoveredDate).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </td>
                    <td className="py-3 px-4 text-center text-red-400 text-xl">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="hover:text-red-500 transition"
                        title="Delete"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400">
            <i className="fas fa-box-open text-4xl text-cyan-500 mb-4"></i>
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
              className="bg-transparent border-gray-600 shadow-lg text-gray-100 rounded-xl p-4 space-y-2 hover:shadow-lg hover:bg-white/20 transition duration-300 relative"
            >
              {/* Delete Icon */}
              <button
                onClick={() => handleDelete(item._id)}
                className="absolute top-2 right-2 text-red-400 hover:text-red-500 transition"
                title="Delete"
              >
                <i className="fas fa-trash-alt"></i>
              </button>

              <h3 className="text-lg font-semibold text-cyan-400">
                <i className="fas fa-tag mr-2 text-cyan-300"></i>
                {item.recoveredTitle}
              </h3>
              <p className="text-sm text-gray-300">
                <i className="fas fa-layer-group mr-1 text-cyan-300"></i>
                <span className="font-medium text-white">Category:</span>{" "}
                {item.recoveredCategory}
              </p>
              <p className="text-sm text-gray-300">
                <i className="fas fa-map-marker-alt mr-1 text-cyan-300"></i>
                <span className="font-medium text-white">Location:</span>{" "}
                {item.recoveredLocation}
              </p>
              <p className="text-sm text-gray-300">
                <i className="fas fa-calendar-day mr-1 text-cyan-300"></i>
                <span className="font-medium text-white">
                  Recovered On:
                </span>{" "}
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
        <div className="text-center py-12 text-gray-400">
          <i className="fas fa-box-open text-4xl text-cyan-500 mb-4"></i>
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
