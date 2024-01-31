import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const token = localStorage.getItem("aigod_token");
  let auth = { token: token };
  const isAuthentucated = auth && auth.token;
  return isAuthentucated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
