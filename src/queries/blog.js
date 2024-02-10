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

const createNewBlogPost = async (blogData) => {
  try {
    const response = await axios.post(
      `${API_URL}/blog/createnewblog`,
      blogData,
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

const getBlogPosts = async () => {
  try {
    const response = await axios.get(`${API_URL}/blog/getallblogs`);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

// getblogbyid
const getBlogById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/blog/getblogbyid/${id}`);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export { createNewBlogPost, getBlogPosts, getBlogById };
