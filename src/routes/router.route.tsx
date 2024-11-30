import MainLayout from "@/components/layouts/layout";
import { ThemeProvider } from "@/components/layouts/theme.layout";
import AuthPage from "@/pages/auth.page";
import DashBoard from "@/pages/dashboard.page";
import PosPage from "@/pages/POS.page";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    element: (
      <ThemeProvider>
        <MainLayout />
      </ThemeProvider>
    ),
    children: [
      {
        path: "/",
        element: <DashBoard />,
      },
      {
        path: "/auth",
        element: <AuthPage />,
      },
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
]);
