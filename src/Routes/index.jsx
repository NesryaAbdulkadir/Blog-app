import { useRoutes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Blogs from "../pages/Blogs";
import Auth from "../pages/Auth";
import PrivateRoute from "../components/PrivateRoute";

export default function Routes() {
  const element = useRoutes([
    {
      path: "/",
      element: (
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      ),
    },
    {
      path: "/blogs",
      element: (
        <PrivateRoute>
          <Blogs />
        </PrivateRoute>
      ),
    },
    {
      path: "/auth",
      element: <Auth />,
    },
  ]);

  return element;
}
