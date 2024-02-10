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
      {
        blog_title: blogData.title,
        blog_description: blogData.description,
        blog_read_time: blogData.readTime,
        blog_content: blogData.content,
        blog_author: blogData.userId,
        blog_image_url: blogData.imageUrl,
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

const getBlogs = async () => {
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

export { createNewBlogPost, getBlogs, getBlogById };
