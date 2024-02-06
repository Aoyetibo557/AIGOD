import axios from "axios";

const API_URL =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_DEV_SERVER_URL
    : process.env.REACT_APP_PROD_SERVER_URL;

const getToken = () => localStorage.getItem("aigod_token");

const handleError = (error) => {
  console.error("Error:", error.message);
  throw new Error(error.message);
};

const updateToken = (newToken) => {
  if (localStorage) {
    localStorage.setItem("aigod_token", newToken);
  } else {
    console.error("localStorage is not supported in this browser");
  }
};

// const verifyToken = async () => {
//   const token = getToken();
//   if (!token) return null;

//   try {
//     const response = await axios.get(`${API_URL}/user/verifiedtoken`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response?.data.user.username;
//   } catch (error) {
//     return handleError(error);
//   }
// };

const verifyToken = async () => {
  try {
    const token = localStorage.getItem("aigod_token");
    if (!token) return null; // Token not present

    const response = await axios.get(`${API_URL}/user/verifiedtoken`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { data } = await response;

    if (data.user) {
      return data.user.username; // Return the username if token is valid
    } else {
      return null; // Return null if token is invalid
    }
  } catch (error) {
    console.error(`Error verifying token: ${error.message}`);
    return null; // Return null if an error occurs during token verification
  }
};

const logOut = () => {
  localStorage.removeItem("aigod_token");
  window.location.href = "/login";
};

export { updateToken, verifyToken, logOut };
