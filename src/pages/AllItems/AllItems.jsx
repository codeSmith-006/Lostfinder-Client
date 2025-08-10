import React, { useState } from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
import ItemsCard from "./ItemsCard";
import Loading from "../../components/Loading/Loading";
import { Dropdown, Menu, Button } from "antd";
import {
  SortAscendingOutlined,
  SortDescendingOutlined,
  FontSizeOutlined,
} from "@ant-design/icons";

const AllItems = () => {
  const navigation = useNavigation();
  const addedData = useLoaderData();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("date-desc");

  // Filter items by search term
  const filteredItems = addedData?.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sorting function based on sortKey
  const sortedItems = filteredItems?.slice().sort((a, b) => {
    switch (sortKey) {
      case "date-asc":
        return new Date(a.date) - new Date(b.date);
      case "date-desc":
        return new Date(b.date) - new Date(a.date);
      case "title-asc":
        return a.title.localeCompare(b.title);
      case "title-desc":
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  const menu = (
    <Menu
      onClick={(e) => setSortKey(e.key)}
      selectedKeys={[sortKey]}
      items={[
        {
          key: "date-desc",
          label: "Most Recent",
          icon: <SortDescendingOutlined />,
        },
        {
          key: "date-asc",
          label: "Oldest First",
          icon: <SortAscendingOutlined />,
        },
        {
          key: "title-asc",
          label: "Title A - Z",
          icon: <FontSizeOutlined />,
        },
        {
          key: "title-desc",
          label: "Title Z - A",
          icon: <FontSizeOutlined />,
        },
      ]}
    />
  );

  // Map sortKey to user-friendly label
  const sortLabelMap = {
    "date-desc": "Most Recent",
    "date-asc": "Oldest First",
    "title-asc": "Title A - Z",
    "title-desc": "Title Z - A",
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {navigation.state === "loading" && <Loading />}

      <h2 className="text-3xl font-bold text-teal-400 mb-6 text-center">
        Lost & Found Items
      </h2>

      <p className="text-center text-gray-300 mb-6 max-w-2xl mx-auto">
        Below are the items posted by users. You can view details of any post or
        help reconnect lost items with their owners.
      </p>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10 max-w-xl mx-auto">
        <div className="relative flex-grow w-full">
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

        <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
          <Button className="flex items-center gap-2 rounded-full bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 shadow-lg">
            Sort: {sortLabelMap[sortKey]}
          </Button>
        </Dropdown>
      </div>

      {sortedItems.length === 0 ? (
        <div className="text-center text-gray-400 mt-20">
          <div className="text-6xl text-teal-500 mb-4">
            <i className="fas fa-box-open"></i>
          </div>
          <h3 className="text-xl font-semibold mb-2">No items found</h3>
          <p className="max-w-md mx-auto">
            We couldn’t find any items that match your search. Try adjusting
            your search terms or check back later.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedItems.map((data) => (
            <ItemsCard key={data._id} data={data} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllItems;
