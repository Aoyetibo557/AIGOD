import { useEffect, useState, useMemo } from "react";
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

  const memoizedUsername = useMemo(() => username, [username]);
  const memoizedError = useMemo(() => error, [error]);

  return { username: memoizedUsername, error: memoizedError };
};

export { useAuth };
