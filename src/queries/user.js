import axios from "axios";
import { updateToken } from "../utils/auth";

const API_URL =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_DEV_SERVER_URL
    : process.env.REACT_APP_PROD_SERVER_URL;

const token = localStorage.getItem("aigod_token");

const handleError = (error) => {
  console.error("Error:", error.message);
  return error;
};

const checkUserCredentials = async ({ username, password }) => {
  try {
    const response = await axios.post(`${API_URL}/user/login`, {
      username,
      password,
    });
    return response?.data;
  } catch (error) {
    throw new Error(
      `Error authenticating user with ${username}: ${error.message}`
    );
  }
};

const registerNewUser = async ({ fullname, email, username, password }) => {
  try {
    const response = await axios.post(`${API_URL}/user/signup`, {
      fullname,
      email,
      username,
      password,
    });
    return response?.data;
  } catch (error) {
    throw new Error(`Error creating new user: ${error.message}`);
  }
};

const getUserProfile = async (username) => {
  try {
    const response = await axios.get(
      `${API_URL}/user/getauthuser/${username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.user;
  } catch (error) {
    return handleError(error);
  }
};

const updateUser = async (uid, updatedData) => {
  try {
    const response = await axios.put(
      `${API_URL}/user/updateuserprofile/${uid}`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    updateToken(response.data.token);
    return response;
  } catch (error) {
    return handleError(error);
  }
};

const sendPasswordResetLink = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/user/send-reset-link`, {
      email,
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error sending reset link: ${error.message}`);
  }
};

const validatePasswordResetToken = async (passwordToken) => {
  try {
    const response = await axios.get(
      `${API_URL}/user/validateresettoken/${passwordToken}`
    );
    return response?.data;
  } catch (error) {
    throw new Error(`Error validating password reset token: ${error.message}`);
  }
};

const updateUserPassword = async ({ email, token, password }) => {
  try {
    const response = await axios.put(`${API_URL}/user/updateuserpassword`, {
      email,
      token,
      password,
    });
    return response?.data;
  } catch (error) {
    throw new Error(`Error updating password: ${error.message}`);
  }
};

export {
  checkUserCredentials,
  registerNewUser,
  getUserProfile,
  updateUser,
  sendPasswordResetLink,
  validatePasswordResetToken,
  updateUserPassword,
};
