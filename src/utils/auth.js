import axios from "axios";

const token = localStorage.getItem("aigod_token");
const API_URL = process.env.REACT_APP_PROD_SERVER_URL;

// A function to update the 'aigod_token' in localStorage
const updateToken = (newToken) => {
  // Check if localStorage is supported in the browser
  if (localStorage) {
    // Get the existing token from localStorage
    const existingToken = localStorage.getItem("aigod_token");

    // Update the token in localStorage with the new token
    localStorage.setItem("aigod_token", newToken);

    // console.log(
    //   `Token updated successfully. Old token: ${existingToken}, New token: ${newToken}`
    // );
  } else {
    console.error("localStorage is not supported in this browser");
  }
};

const getUserProfile = async (username) => {
  let user;
  try {
    await axios
      .get(`${API_URL}/user/getauthuser/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        user = response.data.user;
      })
      .catch((error) => {
        console.log("Error", error);
      });
  } catch (error) {
    console.log("Try Error", error.message);
  }

  return user;
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

const updateUser = async (uid, updatedData) => {
  let res;
  try {
    await axios
      .put(
        `${API_URL}/user/updateuserprofile/${uid}`,
        {
          fullname: updatedData.fullname,
          email: updatedData.email,
          username: updatedData.username,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        updateToken(response.data.token);
        res = response;
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error.message);
    throw new Error();
  }

  return res;
};

// logout
const logOut = () => {
  localStorage.removeItem("aigod_token");
  window.location.href = "/login";
};

export { verifyToken, getUserProfile, updateUser, logOut };
