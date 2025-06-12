import React, { use } from "react";
import { AuthContext } from "../context/AuthContext";
import Loading from "../components/Loading/Loading";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const { currentUser, loading } = use(AuthContext);
  console.log("Current user: ", currentUser)
  if (loading) {
    return <span className="loading loading-spinner text-info"></span>;
  }
  if (!currentUser) {
    return <Navigate to="/login"></Navigate>;
  }
  return children;
};

export default PrivateRoutes;
