import React from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
import ItemsCard from "./ItemsCard";
import Loading from "../../components/Loading/Loading";

const AllItems = () => {
  // loading
  const navigation = useNavigation();

  // fetching data from database
  const addedData = useLoaderData();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {
        navigation.state === 'loading' && <Loading></Loading>
      }
      <h2 className="text-3xl font-bold text-teal-600 mb-6 text-center">
        Lost & Found Items
      </h2>

      <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
        Below are the items posted by users. You can view details of any post or
        help reconnect lost items with their owners.
      </p>

      {/* Card list will go below this */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {addedData.map((data) => (
          <ItemsCard data={data}></ItemsCard>
        ))}
      </div>
    </div>
  );
};

export default AllItems;
