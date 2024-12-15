import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// react imports
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router.route";
import { Provider } from "react-redux";
import { store } from "./store";
import { Toaster } from "./components/ui/toaster";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
