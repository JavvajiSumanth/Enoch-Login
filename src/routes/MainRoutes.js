import { lazy } from "react";

// project imports
import MainLayout from "layout/MainLayout";
import Loadable from "ui-component/Loadable";
import AdminProperties from "Components/Properties/AdminProperties";

// dashboard routing

// utilities routing
const AdminProperty = Loadable(
  lazy(() => import("../Components/Properties/AdminProperty"))
);

// sample page routing

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <AdminProperties />,
    },
    {
      path: "/property",
      element: <AdminProperty />,
    },
    {
      path: "/property/:propertyId",
      element: <AdminProperty />,
    },
  ],
};

export default MainRoutes;
