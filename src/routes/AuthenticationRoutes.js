import { lazy } from "react";

// project imports
import Loadable from "ui-component/Loadable";
import MinimalLayout from "layout/MinimalLayout";
import TenantLogin from "views/pages/authentication/authentication3/TenantLogin";
import Login from "views/pages/authentication/authentication3/Login3";
import Register from "views/pages/authentication/authentication3/Register3";

// login option 3 routing

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: "/",
  element: <MinimalLayout />,
  children: [
    {
      path: "/tenant-login",
      element: <TenantLogin />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/owner-login",
      element: <Login />,
    },
  ],
};

export default AuthenticationRoutes;
