import React, { use, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { showToast } from "../../components/Toast/Toast";

const CardDetails = () => {
  const { currentUser } = use(AuthContext);
  const [recoveredItems, setRecoveredItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  // recovery date
  const [recoveryDate, setRecoveryDate] = useState(new Date());
  const recoveredDate = recoveryDate.toISOString();

  // fetching allRecovered items data
  useEffect(() => {
    fetch("http://localhost:5000/allRecovered")
      .then((response) => response.json())
      .then((data) => setRecoveredItems(data))
      .catch((error) =>
        console.log("Error while fetching allRecovered: ", error)
      );
  }, []);

  console.log("Recovered items: ", recoveredItems[0]);

  // getting the data? data
  const data = useLoaderData();
  console.log("details data: ", data);

  // get the data that i want to check for isRecovered
  const specificData = recoveredItems.find(
    (singleData) => singleData?.recoveredId == data?._id
  );

  console.log("Current date: ", data?.date)

  // navigate
  const navigate = useNavigate();

  // get modal data
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;

    // recovered location
    const recoveredLocation = event.target.Location.value;

    // form data after submit Found This / This is mine modal
    const formData = {
      recoveredLocation,
      recoveredDate,
      isRecover: true,
      recoveredId: data?._id,
      recoveredTitle: data?.title,
      recoveredCategory: data?.category,
      userName: currentUser?.displayName,
      userPhoto: currentUser?.photoURL,
      userEmail: currentUser?.email,
    };

    console.log(formData);

    // posting recovered items data from client side to server
    try {
      const response = await axios.post(
        "http://localhost:5000/allRecovered",
        formData
      );
      if (response.data?.insertedId) {
        showToast("success", "Data posted successfully");
        form.reset();
      }
    } catch (error) {
      console.log("Error while post data to database: ", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg text-gray-800 space-y-6">
      {/* Back Button */}
      <div>
        <button
          onClick={() => navigate(-1)} // or use a route path like navigate("/items")
          className="flex items-center text-teal-600 font-medium hover:underline mb-2"
        >
          <i className="fas fa-arrow-left mr-2"></i> Back
        </button>
      </div>

      {/* Heading */}
      <h2 className="text-3xl font-semibold text-center text-teal-600 mb-6">
        Item Details
      </h2>

      {/* Recovered Status */}
      <p className="text-center text-sm font-medium text-gray-700">
        {specificData?.isRecover ? (
          <span className="text-green-600">✅ Recovered</span>
        ) : (
          <span className="text-red-500">❌ Not Recovered</span>
        )}
      </p>

      {/* Thumbnail */}
      <div className="w-full rounded-xl overflow-hidden shadow-md mb-4">
        <img
          src={data?.thumbnail}
          alt={data?.title}
          className="w-full h-64 object-cover"
        />
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold flex items-center gap-2 text-gray-800">
        <i className="fas fa-tag text-teal-500"></i>
        {data?.title}
      </h3>

      {/* Post Type */}
      <p className="text-md text-gray-600 flex items-center gap-2">
        <i
          className={`fas ${
            data?.postType === "lost" ? "fa-search" : "fa-box-open"
          } text-teal-400`}
        ></i>
        <span className="font-medium">Post Type:</span>{" "}
        {data?.postType.charAt(0).toUpperCase() + data?.postType.slice(1)}
      </p>

      {/* Category */}
      <p className="text-md text-gray-600 flex items-center gap-2">
        <i className="fas fa-layer-group text-teal-400"></i>
        <span className="font-medium">Category:</span> {data?.category}
      </p>

      {/* Location */}
      <p className="text-md text-gray-600 flex items-center gap-2">
        <i className="fas fa-map-marker-alt text-teal-400"></i>
        <span className="font-medium">Location:</span> {data?.location}
      </p>

      {/* Date Lost/Found */}
      <p className="text-md text-gray-600 flex items-center gap-2">
        <i className="fas fa-calendar-day text-teal-400"></i>
        <span className="font-medium">Date Lost/Found:</span>{" "}
        {data?.date ? (
          <span className="ml-1">
            {new Date(data.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        ) : (
          <span className="ml-1">N/A</span>
        )}
      </p>

      {/* Description */}
      <div className="mt-4 text-gray-700">
        <h4 className="text-lg font-semibold mb-2">Description</h4>
        <p>{data?.description}</p>
      </div>

      {/* Action Button */}
      <div className="pt-6">
        <button
          disabled={specificData?.isRecover}
          onClick={() => setModalOpen(true)}
          className="bg-teal-500 hover:bg-teal-600 cursor-pointer transition-all text-white font-semibold py-3 px-6 rounded-full shadow-md"
        >
          {specificData?.isRecover
            ? "Recovered"
            : data?.postType === "lost"
            ? "Found This!"
            : "This is Mine!"}
        </button>
      </div>

      {/* Modal */}
      {modalOpen && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box rounded-2xl space-y-4 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Recovery Information
            </h3>

            <form onSubmit={handleSubmit}>
              {/* Recovered Location */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  <span className="text-red-500">*</span> Recovered Location
                </label>
                <input
                  type="text"
                  required
                  name="Location"
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
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default CardDetails;
