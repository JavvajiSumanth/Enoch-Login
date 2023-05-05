import { useRoutes } from "react-router-dom";

// routes
import { OWNER_ROUTES, TENANT_ROUTES } from "./MainRoutes";
import AuthenticationRoutes from "./AuthenticationRoutes";
import { useContext } from "react";
import { AuthContext } from "context/AuthContext";

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  const { user } = useContext(AuthContext);
  return useRoutes([
    user?.role === "OWNER" ? OWNER_ROUTES : TENANT_ROUTES,
    AuthenticationRoutes,
  ]);
}
