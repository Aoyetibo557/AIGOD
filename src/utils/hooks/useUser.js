// useUser.js
import { useEffect, useState } from "react";
import { getUserProfile } from "../../queries/user";

const useUser = (username) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchUserData = async () => {
      try {
        const userProfile = await getUserProfile(username);
        setProfile(userProfile);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchUserData();
    }
  }, [username]);
  return { profile, loading };
};

export { useUser };
