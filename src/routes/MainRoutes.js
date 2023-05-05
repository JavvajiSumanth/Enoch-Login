import { lazy } from "react";

// project imports
import MainLayout from "layout/MainLayout";
import Loadable from "ui-component/Loadable";
import AdminProperties from "Components/Properties/AdminProperties";
import ViewAdminProperty from "Components/Properties/ViewAdminProperty";
import MaintananceReport from "Components/Properties/MaintananceReport";
import TenantDashboard from "Components/Properties/TenantDashboard";

// dashboard routing

// utilities routing
const AdminProperty = Loadable(
  lazy(() => import("../Components/Properties/AdminProperty"))
);

// sample page routing

// ==============================|| MAIN ROUTING ||============================== //

export const OWNER_ROUTES = {
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
    {
      path: "/view/:propertyId",
      element: <ViewAdminProperty />,
    },
  ],
};
export const TENANT_ROUTES = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <TenantDashboard />,
    },

    {
      path: "/reports",
      element: <MaintananceReport />,
    },
  ],
};
