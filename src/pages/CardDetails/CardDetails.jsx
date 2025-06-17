import React, { use, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { showToast } from "../../components/Toast/Toast";
import axiosSecure from "../../components/hooks/axiosSecure";
import Loading from "../../components/Loading/Loading";

const CardDetails = () => {
  const { currentUser, loading } = use(AuthContext);
  const [recoveredItems, setRecoveredItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  // recovery date
  const [recoveryDate, setRecoveryDate] = useState(new Date());
  const recoveredDate = recoveryDate.toISOString();
  // isRecovered
  const [isRecoverBool, setIsRecoveredBool] = useState(false);
  // data
  const [data, setData] = useState([]);
  // item id
  const id = useParams().id;
  // getting data details
  const navigate = useNavigate();

  useEffect(() => {
    if (loading || !currentUser || !id) return; // wait until auth is ready
    const fetchData = async (id) => {
      const response = await axiosSecure.get(`/items/${id}`);
      const data = await response.data;
      setData(data);
    };

    // calling fetchData
    if (id) {
      fetchData(id);
    }
  }, [id, loading, currentUser]);


  // fetching allRecovered items data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosSecure.get("/allRecovered");
        setRecoveredItems(response.data);
      } catch (error) {
        console.log("Unauthorized: ", error);
      }
    };

    fetchData();
  }, []);

  // getting the data? data

  // get the data that i want to check for isRecovered
  const specificData = recoveredItems.find(
    (singleData) => singleData?.recoveredId == data?._id
  );

  if (data.length == 0) return <Loading></Loading>;

  // navigate

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

    // posting recovered items data from client side to server
    try {
      const response = await axios.post(
        "https://lostfinder-server.vercel.app/allRecovered",
        formData
      );
      if (response.data?.insertedId) {
        showToast("success", "Data posted successfully");
        document.getElementById('recovery_modal').close();
        form.reset();
      }
    } catch (error) {
      console.log("Error while post data to database: ", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-transparent backdrop-blur-md border border-gray-600 shadow-lg rounded-2xl text-gray-300 space-y-6">
      {/* Back Button */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-teal-400 font-medium hover:underline mb-2"
        >
          <i className="fas fa-arrow-left mr-2"></i> Back
        </button>
      </div>

      {/* Heading */}
      <h2 className="text-3xl font-bold text-center text-white">
        Item Details
      </h2>

      {/* Recovered Status */}
      <p className="text-center text-sm font-medium text-gray-300">
        {specificData?.isRecover || isRecoverBool ? (
          <span className="text-green-400">✅ Recovered</span>
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
      <h3 className="text-2xl font-semibold flex items-center gap-2 text-white">
        <i className="fas fa-tag text-teal-400"></i>
        {data?.title}
      </h3>

      {/* Post Type */}
      <p className="text-md text-gray-300 flex items-center gap-2">
        <i
          className={`fas ${
            data?.postType === "lost" ? "fa-search" : "fa-box-open"
          } text-teal-400`}
        ></i>
        <span className="font-medium text-white">Post Type:</span>{" "}
        {data?.postType.charAt(0).toUpperCase() + data?.postType.slice(1)}
      </p>

      {/* Category */}
      <p className="text-md text-gray-300 flex items-center gap-2">
        <i className="fas fa-layer-group text-teal-300"></i>
        <span className="font-medium text-white">Category:</span>{" "}
        {data?.category}
      </p>

      {/* Location */}
      <p className="text-md text-gray-300 flex items-center gap-2">
        <i className="fas fa-map-marker-alt text-teal-300"></i>
        <span className="font-medium text-white">Location:</span>{" "}
        {data?.location}
      </p>

      {/* Date Lost/Found */}
      <p className="text-md text-gray-300 flex items-center gap-2">
        <i className="fas fa-calendar-day text-teal-300"></i>
        <span className="font-medium text-white">Date Lost/Found:</span>{" "}
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
      <div className="mt-4">
        <h4 className="text-lg font-semibold text-white mb-2">Description</h4>
        <p className="text-gray-300">{data?.description}</p>
      </div>

      {/* Action Button */}
      <div className="pt-6">
        <button
          disabled={specificData?.isRecover}
          onClick={() => document.getElementById('recovery_modal').showModal()}
          className={`${
            specificData?.isRecover
              ? "bg-gray-600 cursor-not-allowed text-white"
              : "bg-gradient-to-r from-cyan-500 cursor-pointer to-blue-700 hover:from-cyan-600 hover:to-blue-800 text-white"
          } font-semibold py-3 px-6 rounded-full text-sm shadow transition-all`}
        >
          {specificData?.isRecover || isRecoverBool
            ? "Recovered"
            : data?.postType === "lost"
            ? "Found This!"
            : "This is Mine!"}
        </button>
      </div>

      <dialog id="recovery_modal" className="modal">
        <div className="modal-box rounded-2xl space-y-4 p-6 bg-gray-900 text-gray-300 max-h-[90vh] overflow-y-auto">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <h3 className="text-xl font-semibold text-white mb-4">
            Recovery Information
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Recovered Location */}
            <div>
              <label className="block text-sm font-medium mb-1 text-white">
                <span className="text-red-500">*</span> Recovered Location
              </label>
              <input
                type="text"
                required
                name="Location"
                className="input input-bordered w-full bg-gray-800 text-white border-gray-600"
                placeholder="Where did you return or collect this item?"
              />
            </div>

            {/* Recovery Date */}
            <div>
              <label className="block text-sm font-medium mb-1 text-white">
                <span className="text-red-500">*</span> Recovery Date
              </label>
              <DatePicker
                selected={recoveryDate}
                onChange={(date) => setRecoveryDate(date)}
                placeholderText="Select recovery date"
                className="input input-bordered w-full bg-gray-800 text-white border-gray-600"
                required
              />
            </div>

            {/* User Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-white">
                  Your Name
                </label>
                <input
                  type="text"
                  value={currentUser?.displayName}
                  readOnly
                  className="input input-bordered w-full bg-gray-700 text-gray-400 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-white">
                  Email
                </label>
                <input
                  type="email"
                  value={currentUser?.email}
                  readOnly
                  className="input input-bordered w-full bg-gray-700 text-gray-400 cursor-not-allowed"
                />
              </div>
            </div>

            {/* User Photo */}
            <div>
              <label className="block text-sm font-medium mb-1 text-white">
                Your Image
              </label>
              <img
                src={currentUser?.photoURL}
                alt="User"
                className="h-16 w-16 rounded-full object-cover border border-gray-600"
              />
            </div>

            {/* Modal Actions */}
            <div className="modal-action">
              <form method="dialog">
                <button type="submit" className="btn btn-error">
                  Cancel
                </button>
              </form>
              <button
                onClick={() => setIsRecoveredBool(true)}
                type="submit"
                className="btn bg-gradient-to-r from-cyan-500 to-blue-700 hover:from-cyan-600 hover:to-blue-800 text-white"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default CardDetails;
