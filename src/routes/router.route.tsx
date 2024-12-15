import MainLayout from "@/components/layouts/layout";
import { ThemeProvider } from "@/components/layouts/theme.layout";
import RestaurantProfile from "@/components/profile/restaurantprofile.component";
import { Checkbox } from "@/components/ui/checkbox";
import AuthContex from "@/contex/auth.contex";
import AuthPage from "@/pages/auth.page";
import DashBoard from "@/pages/dashboard.page";
import PosPage from "@/pages/POS.page";
import ProductPage from "@/pages/product.page";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    element: (
      <ThemeProvider>
        <>
        <MainLayout />
       </>
      </ThemeProvider>
    ),
    children: [
      {
        path: "/dashboard",
        element: <DashBoard />,
      },
      {
        path: "/product",
        element:<ProductPage/>
      },
      {
        path: "/profile",
        element:<RestaurantProfile/>
      }
    ],
  },
  {
    element: (
      <ThemeProvider>
        <PosPage />
      </ThemeProvider>
    ),
    path: "/pos",
  },
  {
    element: (
      <ThemeProvider>
        < AuthPage/>
      </ThemeProvider>
    ),
    path: "/",
  },
]);
