import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const MyItems = () => {
  // current user
  const { currentUser } = use(AuthContext);

  // getting all items data
  const [allItems, setAllItems] = useState([]);

  // current user's email
  const currentUserEmail = currentUser?.email;

  // const selected for update post
  const [selectedPost, setSelectedPost] = useState(null);

  // modal open behave
  const[updateModalOpen, setUpdateModalOpen] = useState(false)

  // fetching allRecovered data
  useEffect(() => {
    const fetchAllRecovered = async () => {
      try {
        const response = await fetch("http://localhost:5000/items");
        const data = await response.json();
        setAllItems(data);
      } catch (error) {
        console.log("Error when fetching allReovered: ", error);
      }
    };

    // calling fetchAllRecovered();
    fetchAllRecovered();
  }, []);

  // getting the users post only
  const userPosts = allItems?.filter(
    (singleData) => singleData.email == currentUserEmail
  );

  // handle delete button 
  const handleDelete = () => {

  }

  // handle update submit button
  const handleUpdateSubmit = () => {

  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-2xl shadow-lg text-gray-800 space-y-6">
      <h2 className="text-3xl font-semibold text-center text-teal-600 mb-6">
        My Posted Items
      </h2>

      {userPosts?.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow-md">
            <thead className="bg-teal-50 text-teal-700">
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
              {userPosts.map((item) => (
                <tr key={item.id} className="hover:bg-teal-50 border-t">
                  <td className="py-3 px-4">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-16 h-16 rounded-xl object-cover border"
                    />
                  </td>
                  <td className="py-3 px-4 font-medium">{item.title}</td>
                  <td className="py-3 px-4">{item.category}</td>
                  <td className="py-3 px-4">{item.location}</td>
                  <td className="py-3 px-4 text-center space-x-3">
                    <button
                      onClick={() => {
                        setSelectedPost(item);
                        setUpdateModalOpen(true);
                      }}
                      className="text-teal-500 hover:text-teal-700"
                      title="Update"
                    >
                      <i className="fas fa-edit text-lg"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-500 hover:text-red-700"
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
        <div className="text-center py-12 text-gray-500">
          <i className="fas fa-folder-open text-4xl text-teal-300 mb-4"></i>
          <p className="text-lg font-medium">No items posted yet.</p>
          <p className="text-sm">Once you post an item, it will appear here.</p>
        </div>
      )}

      {/* Update Modal */}
{updateModalOpen && selectedPost && (
  <dialog open className="modal modal-bottom sm:modal-middle">
    <div className="modal-box rounded-2xl space-y-4 p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        <i className="fas fa-pen text-teal-500 mr-2"></i>Update Item
      </h3>

      {/* Post Type */}
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">
          <i className="fas fa-exchange-alt mr-1 text-teal-500"></i>Post Type
        </label>
        <select
          name="postType"
        
          className="select select-bordered w-full"
          required
          defaultValue={currentUser?.postType}
        >
          <option value="">Select Type</option>
          <option value="lost">Lost</option>
          <option value="found">Found</option>
        </select>
      </div>

      {/* Thumbnail */}
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">
          <i className="fas fa-image mr-1 text-teal-500"></i>Thumbnail URL
        </label>
        <input
          type="text"
          name="thumbnail"
        
          className="input input-bordered w-full"
          required
          defaultValue={currentUser?.thumbnail}
        />
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">
          <i className="fas fa-tag mr-1 text-teal-500"></i>Title
        </label>
        <input
          type="text"
          name="title"
        
          className="input input-bordered w-full"
          required
          defaultValue={currentUser?.title}
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">
          <i className="fas fa-info-circle mr-1 text-teal-500"></i>Description
        </label>
        <textarea
          name="description"
        
          className="textarea textarea-bordered w-full"
          rows={3}
          required
          defaultValue={currentUser?.description}
        ></textarea>
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">
          <i className="fas fa-layer-group mr-1 text-teal-500"></i>Category
        </label>
        <input
          type="text"
          name="category"
        
          className="input input-bordered w-full"
          required
          defaultValue={currentUser?.category}
        />
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">
          <i className="fas fa-map-marker-alt mr-1 text-teal-500"></i>Location
        </label>
        <input
          type="text"
          name="location"
        
          className="input input-bordered w-full"
          required
          defaultValue={currentUser?.location}
        />
      </div>

      {/* Date Lost/Found */}
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">
          <i className="fas fa-calendar-day mr-1 text-teal-500"></i>Date Lost/Found
        </label>
        <input
          type="date"
          name="date"
        
          className="input input-bordered w-full"
          required
          defaultValue={currentUser?.date}
        />
      </div>

      {/* User Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            <i className="fas fa-user mr-1 text-teal-500"></i>Your Name
          </label>
          <input
            type="text"
            value={currentUser?.displayName}
            readOnly
            className="input input-bordered w-full bg-gray-100 text-gray-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            <i className="fas fa-envelope mr-1 text-teal-500"></i>Email
          </label>
          <input
            type="email"
            value={currentUser?.email}
            readOnly
            className="input input-bordered w-full bg-gray-100 text-gray-500"
          />
        </div>
      </div>

      {/* Modal Actions */}
      <div className="modal-action">
        <button
          onClick={() => setUpdateModalOpen(false)}
          className="btn btn-ghost"
        >
          Cancel
        </button>
        <button
          onClick={handleUpdateSubmit}
          className="btn bg-teal-500 hover:bg-teal-600 text-white"
        >
          Save Changes
        </button>
      </div>
    </div>
  </dialog>
)}

    </div>
  );
};

export default MyItems;
