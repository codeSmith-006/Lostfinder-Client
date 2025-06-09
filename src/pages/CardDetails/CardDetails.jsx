import React, { use, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const CardDetails = () =>  {
    const {currentUser} = use(AuthContext)
    const [modalOpen, setModalOpen] = useState(false)
    // recovery date
    const [recoveryDate, setRecoveryDate] = useState(new Date)
    // getting the data? data
    const data = useLoaderData();
    console.log(data)
    

    
return (
  <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg text-gray-800 space-y-6">
    {/* Heading */}
    <h2 className="text-3xl font-semibold text-center text-teal-600 mb-6">
      Item Details
    </h2>

    {/* Thumbnail */}
    <div className="w-full rounded-xl overflow-hidden shadow-md mb-4">
      <img src={data?.thumbnail} alt={data?.title} className="w-full h-64 object-cover" />
    </div>

    {/* Title */}
    <h3 className="text-2xl font-bold flex data?s-center gap-2 text-gray-800">
      <i className="fas fa-tag text-teal-500"></i>
      {data?.title}
    </h3>

    {/* Post Type */}
    <p className="text-md text-gray-600 flex data?s-center gap-2">
      <i className={`fas ${data?.postType === 'lost' ? 'fa-search' : 'fa-box-open'} text-teal-400`}></i>
      <span className="font-medium">Post Type:</span> {data?.postType.charAt(0).toUpperCase() + data?.postType.slice(1)}
    </p>

    {/* Category */}
    <p className="text-md text-gray-600 flex data?s-center gap-2">
      <i className="fas fa-layer-group text-teal-400"></i>
      <span className="font-medium">Category:</span> {data?.category}
    </p>

    {/* Location */}
    <p className="text-md text-gray-600 flex data?s-center gap-2">
      <i className="fas fa-map-marker-alt text-teal-400"></i>
      <span className="font-medium">Location:</span> {data?.location}
    </p>

    {/* Date Lost/Found */}
    <p className="text-md text-gray-600 flex data?s-center gap-2">
      <i className="fas fa-calendar-day text-teal-400"></i>
      <span className="font-medium">Date Lost/Found:</span> {data?.date}
    </p>

    {/* Description */}
    <div className="mt-4 text-gray-700">
      <h4 className="text-lg font-semibold mb-2">Description</h4>
      <p>{data?.description}</p>
    </div>

    {/* Action Button */}
    <div className="pt-6">
      <button
        onClick={() => setModalOpen(true)}
        className="bg-teal-500 hover:bg-teal-600 transition-all text-white font-semibold py-3 px-6 rounded-full shadow-md"
      >
        {data?.postType === 'lost' ? 'Found This!' : 'This is Mine!'}
      </button>
    </div>

    {/* Modal */}
{modalOpen && (
  <dialog open className="modal modal-bottom sm:modal-middle">
    <div className="modal-box rounded-2xl space-y-4 p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Recovery Information
      </h3>

      {/* Recovered Location */}
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">
          <span className="text-red-500">*</span> Recovered Location
        </label>
        <input
          type="text"
          required
          className="input input-bordered w-full"
          placeholder="Where did you return or collect this item?"
        />
      </div>

      {/* Recovery Date */}
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">
          <span className="text-red-500">*</span> Recovery Date
        </label>
        <DatePicker
          selected={recoveryDate}
          onChange={(date) => setRecoveryDate(date)}
          placeholderText="Select recovery date"
          className="input input-bordered w-full"
          required
        />
      </div>

      {/* Logged-in currentUser Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Your Name
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
            Email
          </label>
          <input
            type="email"
            value={currentUser?.email}
            readOnly
            className="input input-bordered w-full bg-gray-100 text-gray-500"
          />
        </div>
      </div>

      {/* currentUser Photo */}
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">
          Your Image
        </label>
        <img
          src={currentUser?.photoURL}
          alt="User"
          className="h-16 w-16 rounded-full object-cover border border-gray-300"
        />
      </div>

      {/* Modal Actions */}
      <div className="modal-action">
        <button
          onClick={() => setModalOpen(false)}
          className="btn btn-ghost"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn bg-teal-500 hover:bg-teal-600 text-white"
        >
          Submit
        </button>
      </div>
    </div>
  </dialog>
)}

  </div>
);

};

export default CardDetails;