import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import LostnFound from "../pages/LostnFound/LostnFound";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Error from "../pages/Error/Error";
import AddItems from "../pages/AddItems/AddItems";
import SecondaryLayout from "../layouts/SecondaryLayout";

const Router = createBrowserRouter([

  // main layout routes
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'addItems',
        Component: AddItems
      }

    ],
  },

  // login/register routes
  {
    path: "login",
    Component: Login,
  },
  {
    path: 'register',
    Component: Register
  },

  // error page
  {
    path: '*',
    Component: Error
  },

  // secondary layout for different routes 
]);

export default Router;
