import { createBrowserRouter } from "react-router";
import MainPage from "./pages/main-page";
import CreatePage from "./pages/create-page";
import Layout from "./layout";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/create",
        element: <CreatePage />,
      },
    ],
  },
]);
