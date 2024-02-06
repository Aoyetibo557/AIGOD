import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const token = localStorage.getItem("aigod_token");
  const isAuthenticated =
    token !== "null" &&
    token !== null &&
    token !== "undefined" &&
    token !== undefined &&
    token !== "";
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoutes;
