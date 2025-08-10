import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import DatePicker from "react-datepicker";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../../components/Loading/Loading";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import axiosSecure from "../../components/hooks/axiosSecure";
import { showToast } from "../../components/Toast/Toast";

const MyItems = () => {
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  // State for selected post to update
  const [updatedPost, setUpdatedPost] = useState(null);

  // Selected date state for date picker
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Fetch items with React Query v5 style
  const {
    data: selectedPost = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["myItems"],
    queryFn: async () => {
      const res = await axiosSecure.get("/myItems");
      return res.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes caching (optional)
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axios.delete(
        "https://lostfinder-server.vercel.app/items",
        {
          data: { id },
        }
      );
      return res.data;
    },
    onSuccess: (data) => {
      if (data?.deletedCount) {
        showToast("success", "Item deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["myItems"] });
      } else {
        showToast("error", "Failed to delete item");
      }
    },
    onError: (error) => {
      console.error("Delete error:", error);
      showToast("error", "Failed to delete item");
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async (updatedData) => {
      const res = await axios.patch(
        "https://lostfinder-server.vercel.app/items",
        updatedData
      );
      return res.data;
    },
    onSuccess: (data) => {
      if (data?.modifiedCount) {
        showToast("success", "Data updated successfully");
        queryClient.invalidateQueries({ queryKey: ["myItems"] });
        document.getElementById("update_modal")?.close();
        setUpdatedPost(null);
      } else {
        showToast("error", "Failed to update item");
      }
    },
    onError: (error) => {
      console.error("Update error:", error);
      showToast("error", "Failed to update item");
    },
  });

  // Delete button handler with confirmation
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  // Update form submit handler
  const handleUpdateForm = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const objectData = Object.fromEntries(formData.entries());

    const updatedData = {
      recoveredId: updatedPost?._id,
      ...objectData,
      date: selectedDate,
    };

    updateMutation.mutate(updatedData);
  };

  if (isLoading) return <Loading />;

  if (isError)
    return (
      <div className="text-red-500 text-center p-4">
        Error loading items: {error?.message || "Unknown error"}
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl text-white space-y-6">
      <h2 className="text-3xl font-semibold text-center text-teal-300 mb-6">
        My Posted Items
      </h2>

      {selectedPost.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white/5 backdrop-blur-md rounded-xl shadow-md">
            <thead className="bg-teal-800/20 text-teal-200">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold">
                  Image
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold">
                  Title
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold">
                  Category
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold">
                  Location
                </th>
                <th className="py-3 px-4 text-center text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {selectedPost.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-white/10 transition border-t border-white/10"
                >
                  <td className="py-3 px-4">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-16 h-16 rounded-xl object-cover border border-white/20"
                    />
                  </td>
                  <td className="py-3 px-4 font-medium text-white">
                    {item.title}
                  </td>
                  <td className="py-3 px-4 text-gray-200">{item.category}</td>
                  <td className="py-3 px-4 text-gray-200">{item.location}</td>
                  <td className="py-3 px-4 text-center space-x-4">
                    <Tooltip title="Update">
                      <button
                        onClick={() => {
                          setUpdatedPost(item);
                          setSelectedDate(new Date(item.date) || new Date());
                          document.getElementById("update_modal")?.showModal();
                        }}
                        className="text-teal-400 hover:text-teal-500 transition text-xl"
                        aria-label="Update item"
                      >
                        <EditOutlined />
                      </button>
                    </Tooltip>

                    <Tooltip title="Delete">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-500 hover:text-red-600 transition text-xl"
                        aria-label="Delete item"
                      >
                        <DeleteOutlined />
                      </button>
                    </Tooltip>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12 text-white/80">
          <i className="fas fa-folder-open text-4xl text-teal-300 mb-4"></i>
          <p className="text-lg font-medium">No items posted yet.</p>
          <p className="text-sm">Once you post an item, it will appear here.</p>
        </div>
      )}

      {/* Update Modal */}
      <dialog id="update_modal" className="modal">
        <div className="modal-box bg-gray-900 backdrop-blur-md rounded-2xl text-white max-h-[90vh] overflow-y-auto relative">
          <form method="dialog">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => {
                document.getElementById("update_modal")?.close();
                setUpdatedPost(null);
              }}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              aria-label="Close modal"
            >
              ✕
            </button>
          </form>

          <h3 className="text-xl font-semibold mb-4">
            <i className="fas fa-pen text-teal-300 mr-2"></i>Update Item
          </h3>

          <form onSubmit={handleUpdateForm} className="space-y-4">
            {/* Post Type */}
            <div>
              <label className="block text-sm font-medium mb-1 text-teal-200">
                <i className="fas fa-exchange-alt mr-1 text-teal-300"></i>Post
                Type
              </label>
              <select
                name="postType"
                className="select select-bordered w-full bg-white/10 border-white/30 text-white"
                required
                defaultValue={updatedPost?.postType}
              >
                <option className="text-gray-600" value="">
                  Select Type
                </option>
                <option className="text-gray-600" value="lost">
                  Lost
                </option>
                <option className="text-gray-600" value="found">
                  Found
                </option>
              </select>
            </div>

            {/* Thumbnail */}
            <div>
              <label className="block text-sm font-medium mb-1 text-teal-200">
                <i className="fas fa-image mr-1 text-teal-300"></i>Thumbnail URL
              </label>
              <input
                type="text"
                name="thumbnail"
                className="input input-bordered w-full bg-white/10 text-white border-white/30"
                required
                defaultValue={updatedPost?.thumbnail}
              />
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-1 text-teal-200">
                <i className="fas fa-tag mr-1 text-teal-300"></i>Title
              </label>
              <input
                type="text"
                name="title"
                className="input input-bordered w-full bg-white/10 text-white border-white/30"
                required
                defaultValue={updatedPost?.title}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-1 text-teal-200">
                <i className="fas fa-info-circle mr-1 text-teal-300"></i>
                Description
              </label>
              <textarea
                name="description"
                className="textarea textarea-bordered w-full bg-white/10 text-white border-white/30"
                rows={3}
                required
                defaultValue={updatedPost?.description}
              ></textarea>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-1 text-teal-200">
                <i className="fas fa-layer-group mr-1 text-teal-300"></i>
                Category
              </label>
              <select
                name="category"
                required
                defaultValue={updatedPost?.category || ""}
                className="w-full bg-white/10 text-white border border-white/30 rounded-lg px-4 py-2 focus:outline-none"
              >
                <option className="text-gray-600" value="">
                  Select Category
                </option>
                <option className="text-gray-600" value="pets">
                  Pets
                </option>
                <option className="text-gray-600" value="documents">
                  Documents
                </option>
                <option className="text-gray-600" value="gadgets">
                  Gadgets
                </option>
                <option className="text-gray-600" value="others">
                  Others
                </option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium mb-1 text-teal-200">
                <i className="fas fa-map-marker-alt mr-1 text-teal-300"></i>
                Location
              </label>
              <input
                type="text"
                name="location"
                className="input input-bordered w-full bg-white/10 text-white border-white/30"
                required
                defaultValue={updatedPost?.location}
              />
            </div>

            {/* Date Lost/Found */}
            <div>
              <label className="block text-sm font-medium mb-1 text-teal-200">
                <i className="fas fa-calendar-day mr-1 text-teal-300"></i>Date
                Lost or Found
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                placeholderText="Select a date"
                required
                dateFormat="yyyy-MM-dd"
                className="w-full bg-white/10 text-white border border-white/30 rounded-lg px-4 py-2 focus:outline-none"
              />
              {selectedDate && (
                <p className="text-sm text-gray-300 mt-1">
                  📅 Formatted:{" "}
                  {selectedDate.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              )}
            </div>

            {/* User Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-teal-200">
                  <i className="fas fa-user mr-1 text-teal-300"></i>Your Name
                </label>
                <input
                  type="text"
                  value={currentUser?.displayName || ""}
                  readOnly
                  className="input input-bordered w-full bg-white/10 text-gray-300 border-white/30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-teal-200">
                  <i className="fas fa-envelope mr-1 text-teal-300"></i>Email
                </label>
                <input
                  type="email"
                  value={currentUser?.email || ""}
                  readOnly
                  className="input input-bordered w-full bg-white/10 text-gray-300 border-white/30"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="modal-action flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  document.getElementById("update_modal")?.close();
                  setUpdatedPost(null);
                }}
                className="btn btn-error"
              >
                Cancel
              </button>
              <input
                type="submit"
                value={updateMutation.isLoading ? "Saving..." : "Save Changes"}
                disabled={updateMutation.isLoading}
                className="btn bg-teal-500 hover:bg-teal-600 text-white"
              />
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default MyItems;
