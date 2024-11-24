import { Router, useRoutes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Blogs from "../pages/Blogs";

export default function Routes() {
  const element = useRoutes([
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/blogs",
      element: <Blogs />,
    },
  ]);
  return element;
}
