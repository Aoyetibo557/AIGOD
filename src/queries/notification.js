import axios from "axios";

const API_URL =
  process.env.REACT_APP_REACT_APP_NODE_ENV === "development"
    ? process.env.REACT_APP_DEV_SERVER_URL
    : process.env.REACT_APP_PROD_SERVER_URL;

const token = localStorage.getItem("aigod_token");

const getUserNotification = async (userId) => {
  try {
    const response = await axios.get(
      `${API_URL}/notification/getusernotifications/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error.message);
    return error;
  }
};

const markNotificationAsRead = async (notificationId) => {
  try {
    const response = await axios.put(
      `${API_URL}/notification/marknotificationasread/${notificationId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error.message);
    return error;
  }
};

export { getUserNotification, markNotificationAsRead };
