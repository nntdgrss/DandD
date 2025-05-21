import { createBrowserRouter } from "react-router";
import MainPage from "./pages/main-page";
import CreatePage from "./pages/create-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/create",
    element: <CreatePage />,
  },
]);
