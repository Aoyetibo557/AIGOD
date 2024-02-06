// useUser.js
import { useEffect, useState } from "react";
import { getUserProfile } from "../../queries/user";

const useUser = (username) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userProfile = await getUserProfile(username);
        setProfile(userProfile);
      } catch (error) {
        console.error(error.message);
      }
    };

    if (username) {
      fetchUserData();
    }
  }, [username]);
  return { profile };
};

export { useUser };
