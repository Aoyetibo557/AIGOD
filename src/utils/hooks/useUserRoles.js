import { useEffect, useState, useMemo } from "react";
import { getUserRoles } from "../../queries/role"; // This is where you make the API call to fetch user roles

export const useUserRoles = (userId) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [userRoles, setUserRoles] = useState([]);

  useEffect(() => {
    const fetchUserRoles = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const result = await getUserRoles(userId); // Make API call to fetch user roles
        setIsLoading(false);
        const userRolesNames = result.roles.map((role) => role.role_name);
        setUserRoles(userRolesNames);
      } catch (error) {
        console.error("Error fetching user roles:", error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchUserRoles();
    }
  }, [userId]);

  return { userRoles, isLoading, isError };
};
