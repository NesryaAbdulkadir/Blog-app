import { useRoutes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Blogs from "../pages/Blogs";
import Auth from "../pages/Auth";

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
    {
      path: "/auth",
      element: <Auth />,
    },
  ]);

  return element;
}
