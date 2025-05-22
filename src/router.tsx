import { createBrowserRouter } from "react-router";
import MainPage from "./pages/main-page";
import CreatePage from "./pages/create-page";
import Layout from "./layout";
import NotFound from "./pages/not-found";
import TablePage from "./pages/table";
import TableNotFound from "./pages/table-not-found";

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
      {
        path: "/table/:table",
        element: <TablePage />,
      },
      {
        path: "/table-not-found",
        element: <TableNotFound />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
