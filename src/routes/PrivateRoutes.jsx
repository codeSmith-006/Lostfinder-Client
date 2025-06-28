import React, { use } from "react";
import { AuthContext } from "../context/AuthContext";
import Loading from "../components/Loading/Loading";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const { currentUser, loading } = use(AuthContext);
  const location = useLocation();
  console.log(location)
  // console.log("Current user: ", currentUser)
  if (loading) {
    return <Loading></Loading>
  }
  if (!currentUser) {
    return <Navigate state={{from: location}} to="/login"></Navigate>;
  }
  return children;
};

export default PrivateRoutes;
