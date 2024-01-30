import axios from "axios";

const verifyToken = async () => {
  const token = localStorage.getItem("aigod_token");
  const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:8080";
  let authenticatedUser;
  if (token) {
    try {
      await axios
        .get(`${API_URL}/user/profile`, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((response) => {
          authenticatedUser = response.data.user.username;
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log("Try error", error.message);
    }

    return authenticatedUser;
  }

  return null;
};

export { verifyToken };
