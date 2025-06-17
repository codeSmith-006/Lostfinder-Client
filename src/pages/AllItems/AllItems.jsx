import React from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
import ItemsCard from "./ItemsCard";
import Loading from "../../components/Loading/Loading";
import { useState } from "react";

const AllItems = () => {
  // loading
  const navigation = useNavigation();

  // fetching data from database
  const addedData = useLoaderData();

  const [searchTerm, setSearchTerm] = useState("");

// Example: Filtered posts (if you're using searchTerm to filter)
const filteredItems = addedData?.filter((item) =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  item.location.toLowerCase().includes(searchTerm.toLowerCase())
);

return (
  <div className="max-w-6xl mx-auto px-4 py-8">
    {navigation.state === "loading" && <Loading />}

    <h2 className="text-3xl font-bold text-teal-400 mb-6 text-center">
      Lost & Found Items
    </h2>

    <p className="text-center text-gray-300 mb-10 max-w-2xl mx-auto">
      Below are the items posted by users. You can view details of any post or
      help reconnect lost items with their owners.
    </p>

    {/* Search Bar */}
    <div className="flex justify-center mb-10">
      <div className="relative w-full max-w-xl">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-teal-500">
          <i className="fas fa-search"></i>
        </span>
        <input
          type="text"
          placeholder="Search by title or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 text-gray-300 focus:border-transparent transition"
        />
      </div>
    </div>

    {filteredItems.length === 0 ? (
      <div className="text-center text-gray-400 mt-20">
        <div className="text-6xl text-teal-500 mb-4">
          <i className="fas fa-box-open"></i>
        </div>
        <h3 className="text-xl font-semibold mb-2">No items found</h3>
        <p className="max-w-md mx-auto">
          We couldn’t find any items that match your search. Try adjusting your
          search terms or check back later.
        </p>
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((data) => (
          <ItemsCard key={data.id} data={data} />
        ))}
      </div>
    )}
  </div>
);

};

export default AllItems;
