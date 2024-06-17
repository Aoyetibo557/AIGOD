import axios from "axios";
import { updateToken } from "../utils/auth";

const API_URL =
  process.env.REACT_APP_NODE_ENV === "development"
    ? process.env.REACT_APP_DEV_SERVER_URL
    : process.env.REACT_APP_PROD_SERVER_URL;

const token = localStorage.getItem("aigod_token");

//handle error:later create a global error handler for the app
const handleError = (error) => {
  console.error("Error:", error.message);
  return error;
};

// get users count
const getUsersCount = async () => {
  try {
    const response = await axios.get(`${API_URL}/stats/getuserscount`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

//get all the users with roles in the user_roles table
const getAllUsersWithRoles = async () => {
  try {
    const response = await axios.get(`${API_URL}/role/getuserswithroles`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

// crate a new log
const createLog = async (log) => {
  try {
    const response = await axios.post(`${API_URL}/logs/createlog`, log, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

//get all the logs
const getAllLogs = async () => {
  try {
    const response = await axios.get(`${API_URL}/logs/getalllogs`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export { getAllUsersWithRoles, createLog, getAllLogs, getUsersCount };
