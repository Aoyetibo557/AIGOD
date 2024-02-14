import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../utils/hooks/useAuth";
import { useUser } from "../../utils/hooks/useUser";
import { useUserRoles } from "../../utils/hooks/useUserRoles";

const AdminRoutes = ({ element: Element, ...rest }) => {
  const { username } = useAuth();
  const { profile } = useUser(username || "");
  const { userRoles, isLoading, isError } = useUserRoles(profile?.id);
  console.log("User Roles:", userRoles, isLoading);

  const isAdmin = userRoles.includes("super admin");
  const isModerator = userRoles.includes("moderator");

  if (isLoading) {
    // Still loading, return null or a loading indicator
    return null;
  }

  if (!isAdmin && !isModerator) {
    // User doesn't have admin or moderator role, navigate to home
    return <Navigate to="/" />;
  }

  // User has admin or moderator role, render the outlet
  return <Outlet />;
};

export default AdminRoutes;
