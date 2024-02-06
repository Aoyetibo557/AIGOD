import { useEffect, useState } from "react";
import { verifyToken } from "../auth";

const useAuth = () => {
  const [username, setUsername] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const authenticatedUser = await verifyToken();
        if (authenticatedUser) {
          setUsername(authenticatedUser);
        } else {
          setError("User not authenticated");
        }
      } catch (error) {
        setError(`Error authenticating user: ${error.message}`);
      }
    };

    checkAuthentication();
  }, []);

  return { username, error };
};

export { useAuth };
