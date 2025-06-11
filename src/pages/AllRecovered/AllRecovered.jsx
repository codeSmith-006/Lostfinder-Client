import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const AllRecovered = () => {
  // all recovered data
  const [allRecovered, setAllRecovered] = useState([]);
  // all items
  const [allItems, setAllItems] = useState([])
  // current user
  const { currentUser } = use(AuthContext);
  // current user's email
  const currentUserEmail = currentUser?.email;

  // fetching all items data
  useEffect(() => {
    const fetchAllRecovered = async () => {
      try {
        const response = await fetch("http://localhost:5000/items");
        const data = await response.json();
        setAllItems(data);
      } catch (error) {
        console.log("Error when fetching allRecovered: ", error);
      }
    };

    // calling fetchAllRecovered();
    fetchAllRecovered();
  }, []);


  // fetching allRecovered data
  useEffect(() => {
    const fetchAllRecovered = async () => {
      try {
        const response = await fetch("http://localhost:5000/allRecovered");
        const data = await response.json();
        setAllRecovered(data);
      } catch (error) {
        console.log("Error when fetching allReovered: ", error);
      }
    };

    // calling fetchAllRecovered();
    fetchAllRecovered();
  }, []);

  const recoveredCurrentEmail = allRecovered.find(
    (singleData) => singleData.userEmail == currentUserEmail
  )?.userEmail;

  // getting data that only for the logged user
  const usersPost = allItems.filter(
    (singleData) => singleData.userEmail == recoveredCurrentEmail
  );
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg text-gray-800 space-y-6">
      <h2 className="text-3xl font-semibold text-center text-teal-600 mb-6">
        My Recovered Items
      </h2>

      {usersPost?.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow-md">
            <thead className="bg-teal-50 text-teal-700">
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
              </tr>
            </thead>
            <tbody>
              {usersPost.map((item, index) => (
                <tr
                  key={item.id || index}
                  className="hover:bg-teal-50 transition-colors border-t"
                >
                  <td className="py-3 px-4 text-gray-800 font-medium">
                    {item.title}
                  </td>
                  <td className="py-3 px-4 text-gray-600">{item.category}</td>
                  <td className="py-3 px-4 text-gray-600">
                    {item.recoveredLocation}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {item.recoveryDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <i className="fas fa-box-open text-4xl text-teal-300 mb-4"></i>
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
