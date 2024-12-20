import {
  Barcode,
  FileText,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";
import logo from "./assets/icons/logo.png";

//main color
export const MAIN_COLOR = "#50C67C";
export const MAIN_COLOR_DARK = "#31A497";

//secondary color
export const SECONDARY_COLOR = "#F7B11D";
export const SECONDARY_COLOR_DARK = "#E9880F";

//text color
export const TEXT_COLOR = "#193648";
export const TEXT_COLOR_DARK = "#000000";

//menu items
export const MENU_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", link: "/" },
  { icon: Users, label: "Roles & Users", link: "/roles-users" },
  { icon: FileText, label: "Reports", link: "/reports" },
  { icon: Barcode, label: "Products", link: "/products" },
  { icon: Settings, label: "Settings", link: "/settings" },
];

//sidebar width
export const COLLAPSED_WIDTH = 20;
export const EXPANDED_WIDTH = 64;

//logo image
export const LOGO_IMAGE = logo;
export const COMPANY_NAME = "ForkFlow";

//user types
export const USER_TYPES = [
  "ADMIN",
  "POS_USER",
  "INVENTORY_USER",
  "KITCHEN_USER",
];
