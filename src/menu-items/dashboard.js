// assets
import { IconDashboard, IconBuilding, IconTool } from "@tabler/icons";

// constant
const icons = { IconDashboard, IconBuilding, IconTool };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
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
      visible: "OWNER",
    },
    {
      id: "default2",
      title: "Add Properties",
      type: "item",
      url: "/property",
      icon: icons.IconBuilding,
      breadcrumbs: false,
      visible: "OWNER",
    },
    {
      id: "default3",
      title: "Maintanance Report",
      type: "item",
      url: "/reports",
      icon: icons.IconTool,
      breadcrumbs: false,
      visible: "OWNER",
    },
  ],
};

export default dashboard;
