import axios from "axios";

const token = localStorage.getItem("aigod_token");
const API_URL =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_DEV_SERVER_URL
    : process.env.REACT_APP_PROD_SERVER_URL;

// A function to update the 'aigod_token' in localStorage
const updateToken = (newToken) => {
  // Check if localStorage is supported in the browser
  if (localStorage) {
    // Get the existing token from localStorage
    const existingToken = localStorage.getItem("aigod_token");

    // Update the token in localStorage with the new token
    localStorage.setItem("aigod_token", newToken);
  } else {
    console.error("localStorage is not supported in this browser");
  }
};

const verifyToken = async () => {
  let authenticatedUser = null;

  if (token) {
    try {
      const response = await axios.get(`${API_URL}/user/verifiedtoken`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      authenticatedUser = response?.data.user.username;
    } catch (error) {
      console.log("Error in verifyToken:", error.message);
    }
  }

  return authenticatedUser;
};

// logout
const logOut = () => {
  localStorage.removeItem("aigod_token");
  window.location.href = "/login";
};

export { updateToken, verifyToken, logOut };
