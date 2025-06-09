import axios from "axios";
import React, { use, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { showToast } from "../../components/Toast/Toast";
import { AuthContext } from "../../context/AuthContext";

const AddItems = () => {
  const [currentDate, selectedDate] = useState(new Date());
  const {currentUser} = use(AuthContext);

  //   handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await axios.post("http://localhost:5000/items", data);
        if(response.data?.insertedId) {
            showToast('success', 'Item added successfully')
            form.reset();
        }
    } catch (error) {
        console.log("Error from client side for added items: ", error)
    }
  };
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg text-gray-800 space-y-6">
      <h2 className="text-2xl font-semibold text-center text-teal-600">
        Create a New Post
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Post Type */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Post Type <span className="text-red-500">*</span>
          </label>
          <select
            name="postType"
            required
            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-teal-500"
          >
            <option value="">Select...</option>
            <option value="lost">Lost</option>
            <option value="found">Found</option>
          </select>
        </div>

        {/* Thumbnail */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Image Thumbnail URL <span className="text-red-500">*</span>
          </label>
          <input
            name="thumbnail"
            type="text"
            placeholder="Enter image URL"
            required
            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-teal-500"
          />
        </div>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            name="title"
            type="text"
            placeholder="Post title"
            required
            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-teal-500"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            rows="3"
            required
            placeholder="Describe the item"
            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-teal-500"
          ></textarea>
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            name="category"
            required
            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-teal-500"
          >
            <option value="">Select Category</option>
            <option value="pets">Pets</option>
            <option value="documents">Documents</option>
            <option value="gadgets">Gadgets</option>
            <option value="others">Others</option>
          </select>
        </div>

        {/* Location */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Location <span className="text-red-500">*</span>
          </label>
          <input
            name="location"
            type="text"
            required
            placeholder="Where was it lost/found?"
            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-teal-500"
          />
        </div>

        {/* Date */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Date Lost or Found <span className="text-red-500">*</span>
          </label>
          <DatePicker
            selected={currentDate}
            onChange={(date) => selectedDate(date)}
            placeholderText="Select a date"
            required
            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-teal-500"
          />
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 mb-4 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Your Name <span className="text-red-500">*</span>
            </label>
            <input
            value={currentUser?.displayName}
              type="text"
              readOnly
              className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={currentUser?.email}
              readOnly
              className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-gray-500"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4">
          <input
            type="submit" 
            value="Add Post"
            className="w-full cursor-pointer btn bg-teal-500 hover:bg-teal-600 transition-all text-white font-semibold py-3 rounded-full shadow-sm"
          />
        </div>
      </form>
    </div>
  );
};

export default AddItems;
