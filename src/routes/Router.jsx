import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import LostnFound from "../pages/LostnFound/LostnFound";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Error from "../pages/Error/Error";
import AddItems from "../pages/AddItems/AddItems";
import AllItems from "../pages/AllItems/AllItems";
import CardDetails from "../pages/CardDetails/CardDetails";
import AllRecovered from "../pages/AllRecovered/AllRecovered";
import MyItems from "../pages/MyItems/MyItems";
import PrivateRoutes from "./PrivateRoutes";
import { ItemsDetailsLoader } from "../components/hooks/itemsDetailsLoader";

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
        path: "addItems",
        element: <PrivateRoutes>
          <AddItems></AddItems>
        </PrivateRoutes>
      },
      {
        path: "allItems",
        loader: () => fetch("http://localhost:5000/items"),
        Component: AllItems,
      },
      {
        path: "allItems/:id",
        element: <PrivateRoutes>
          <CardDetails></CardDetails>
        </PrivateRoutes>
      },
      {
        path: 'recoveredItems',
        element: <PrivateRoutes>
          <AllRecovered></AllRecovered>
        </PrivateRoutes>
      },
      {
        path: 'myItems',
        element: <PrivateRoutes>
          <MyItems></MyItems>
        </PrivateRoutes>
      }
    ],
  },

  // login/register routes
  {
    path: "login",
    Component: Login,
  },
  {
    path: "register",
    Component: Register,
  },

  // error page
  {
    path: "*",
    Component: Error,
  },

  // secondary layout for different routes
]);

export default Router;
