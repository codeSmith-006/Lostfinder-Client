import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import LostnFound from "../pages/LostnFound/LostnFound";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

const Router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "lost-and-found",
        Component: LostnFound,
      },
    ],
  },
  {
    path: "login",
    Component: Login,
  },
  {
    path: 'register',
    Component: Register
  }
]);

export default Router;
