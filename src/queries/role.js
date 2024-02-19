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

// get user roles
const getUserRoles = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/role/getuserroles/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

// create user role
const createUserRole = async (roleData) => {
  try {
    const response = await axios.post(
      `${API_URL}/role/createnewrole`,
      {
        roleName: roleData.roleName,
        description: roleData.roleDescription,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

// assign roles to user
const assignRoles = async (userData) => {
  try {
    const response = await axios.post(
      `${API_URL}/role/assignroles`,
      {
        userId: userData.userId,
        roles: userData.roles,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

// get all the roles from the roles table
const getRoles = async () => {
  try {
    const response = await axios.get(`${API_URL}/role/getallroles`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

// unassign role from user
const unassignRole = async (userData) => {
  try {
    const response = await axios.post(
      `${API_URL}/role/unassignrole`,
      {
        userId: userData.userId,
        roleId: userData.roleId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export { getUserRoles, createUserRole, assignRoles, getRoles, unassignRole };
