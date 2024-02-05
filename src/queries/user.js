import axios from "axios";
import { updateToken } from "../utils/auth";

const token = localStorage.getItem("aigod_token");
const API_URL =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_DEV_SERVER_URL
    : process.env.REACT_APP_PROD_SERVER_URL;

const checkUserCredentials = async (cred) => {
  try {
    const response = await axios.post(`${API_URL}/user/login`, {
      username: cred.username,
      password: cred.password,
    });

    return response?.data;
  } catch (error) {
    return `Error authenticating user with ${cred.username}: ${error.message}`;
  }
};

const registerNewUser = async (newUser) => {
  try {
    const response = await axios.post(`${API_URL}/user/signup`, {
      fullname: newUser.fullname,
      email: newUser.email,
      username: newUser.username,
      password: newUser.password,
    });

    return response?.data;
  } catch (error) {
    console.error(`Error Creating new user ${error.message}`);
    return error.message;
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
    console.error("Try Error", error.message);
    return error.message;
  }

  return user;
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
    console.error(error.message);
    return error.message;
  }

  return res;
};

// send reset link
const sendPasswordResetLink = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/user/send-reset-link`, {
      email: email,
    });
    return response.data;
  } catch (error) {
    console.error(`Error Sending reset Link ${error.message}`);
    return error.message;
  }
};

const validatePasswordResetToken = async (passwordToken) => {
  try {
    const response = await axios.get(
      `${API_URL}/user/validateresettoken/${passwordToken}`
    );
    return response?.data;
  } catch (error) {
    console.error(
      `Error Occured in Password Reset Token Validation: ${error.message}`
    );
    return error.message;
  }
};

const updatePassword = async (resetData) => {
  try {
    const response = await axios.put(`${API_URL}/user/updateuserpassword`, {
      email: resetData.email,
      token: resetData.token,
      password: resetData.password,
    });
    return response?.data;
  } catch (error) {
    console.error(`Error updating password: ${error.message}`);
  }
};

export {
  checkUserCredentials,
  registerNewUser,
  getUserProfile,
  updateUser,
  sendPasswordResetLink,
  validatePasswordResetToken,
  updatePassword,
};
