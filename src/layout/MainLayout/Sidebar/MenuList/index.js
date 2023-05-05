// material-ui
import { Typography } from "@mui/material";

// project imports
import NavGroup from "./NavGroup";
import { AuthContext } from "context/AuthContext";
import { useContext } from "react";
import { owner_menu, tenant_menu } from "menu-items";

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
  const { user } = useContext(AuthContext);

  const menus = user?.role === "OWNER" ? owner_menu : tenant_menu;
  const navItems = menus.items.map((item) => {
    switch (item.type) {
      case "group":
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return <>{navItems}</>;
};

export default MenuList;
