// ==============================|| MENU ITEMS ||============================== //
// assets
import { IconDashboard, IconBuilding, IconTool } from "@tabler/icons";

// constant
const icons = { IconDashboard, IconBuilding, IconTool };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const owner = {
  id: "dashboard",
  type: "group",
  children: [
    {
      id: "default",
      title: "Properties",
      type: "item",
      url: "/",
      icon: icons.IconDashboard,
      breadcrumbs: false,
    },
    {
      id: "default2",
      title: "Add Properties",
      type: "item",
      url: "/property",
      icon: icons.IconBuilding,
      breadcrumbs: false,
    },
  ],
};
const tenant = {
  id: "dashboard",
  type: "group",
  children: [
    {
      id: "default2",
      title: "Dashboard",
      type: "item",
      url: "/",
      icon: icons.IconDashboard,
      breadcrumbs: false,
    },
    {
      id: "default3",
      title: "Add Report",
      type: "item",
      url: "/reports",
      icon: icons.IconTool,
      breadcrumbs: false,
    },
  ],
};
export const owner_menu = {
  items: [owner],
};
export const tenant_menu = {
  items: [tenant],
};
