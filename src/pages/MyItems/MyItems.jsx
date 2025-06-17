import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import DatePicker from "react-datepicker";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { showToast } from "../../components/Toast/Toast";
import axiosSecure from "../../components/hooks/axiosSecure";
import Swal from "sweetalert2";

const MyItems = () => {
  // current user
  const { currentUser } = use(AuthContext);

  // getting all items data
  const [SelectedPost, setSelectedPost] = useState([]);

  // const selected for update post
  const [updatedPost, setUpdatedPost] = useState(null);

  // modal open behave
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  // selected date
  const [selectedDate, setSelectedDate] = useState(new Date());

  // fetching allRecovered data
  useEffect(() => {
    const fetchAllRecovered = async () => {
      try {
        const response = await axiosSecure("/myItems");
        const data = response.data;
        setSelectedPost(data);
      } catch (error) {
        console.log("Error when fetching allReovered: ", error);
      }
    };

    // calling fetchAllRecovered();
    fetchAllRecovered();
  }, []);

  // handle delete button
  const handleDelete = async (id) => {
    // handing delete with confirm
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then( async (result) => {
      if (result.isConfirmed) {
            const targetedId = {
      id,
    };
    console.log("targeted id: ", targetedId);
    try {
      const response = await axios.delete("https://lostfinder-server.vercel.app/items", {
        data: targetedId,
      });
      if (response.data?.deletedCount) {
        const dataAfterDelete = SelectedPost.filter(
          (singleData) => singleData._id !== id
        );
        setSelectedPost(dataAfterDelete);
        showToast('success', 'Item deleted successfully')
      }
    } catch (error) {
      console.log("While deleted method from client side: ", error);
    }
      }
    });
  };

  // handling update data form
  const handleUpdateForm = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const objectData = Object.fromEntries(formData.entries());
    const updatedData = {
      recoveredId: updatedPost?._id,
      ...objectData,
      date: selectedDate,
    };

    // sending data to backend
    try {
      const response = await axios.patch(
        "https://lostfinder-server.vercel.app/items",
        updatedData
      );
      console.log(response.data);
      if (response.data?.modifiedCount) {
        showToast("success", "Data updated successfully");
      }
    } catch (error) {
      console.log("Error while post form data to backend ", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl text-white space-y-6">
      <h2 className="text-3xl font-semibold text-center text-teal-300 mb-6">
        My Posted Items
      </h2>

      {SelectedPost?.length > 0 ? (
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
              {SelectedPost.map((item) => (
                <tr
                  key={item.id}
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
                  <td className="py-3 px-4 text-center space-x-3">
                    <NavLink>
                      <button
                        onClick={() => {
                          setUpdatedPost(item);
                          setUpdateModalOpen(true);
                          document.getElementById("update_modal").showModal();
                        }}
                        className="text-teal-300 hover:text-teal-400 transition"
                        title="Update"
                      >
                        <i className="fas fa-edit text-lg"></i>
                      </button>
                    </NavLink>
                    <button
                      onClick={() => handleDelete(item?._id)}
                      className="text-red-400 hover:text-red-500 transition"
                      title="Delete"
                    >
                      <i className="fas fa-trash-alt text-lg"></i>
                    </button>
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
        <div className="modal-box bg-gray-900 backdrop-blur-md rounded-2xl text-white max-h-[90vh] overflow-y-auto">
          <form method="dialog">
            {/* Close Button */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
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
                <option className="text-gray-600" value="">Select Type</option>
                <option className="text-gray-600" value="lost">Lost</option>
                <option className="text-gray-600" value="found">Found</option>
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
                <option className="text-gray-600" value="">Select Category</option>
                <option className="text-gray-600" value="pets">Pets</option>
                <option className="text-gray-600" value="documents">Documents</option>
                <option className="text-gray-600" value="gadgets">Gadgets</option>
                <option className="text-gray-600" value="others">Others</option>
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
                  value={currentUser?.displayName}
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
                  value={currentUser?.email}
                  readOnly
                  className="input input-bordered w-full bg-white/10 text-gray-300 border-white/30"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="modal-action">
              <form method="dialog">
                <button className="btn btn-error">Cancel</button>
              </form>
              <input
                type="submit"
                value="Save Changes"
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
