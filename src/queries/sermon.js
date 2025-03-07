import axios from "axios";

const API_URL =
  process.env.REACT_APP_NODE_ENV === "development"
    ? process.env.REACT_APP_DEV_SERVER_URL
    : process.env.REACT_APP_PROD_SERVER_URL;

const token = localStorage.getItem("aigod_token");

const handleError = (error) => {
  console.error("Error:", error.message);
  return error;
};

const createNewSermonPost = async (blogData) => {
  try {
    const response = await axios.post(
      `${API_URL}/blog/createnewblog`,
      {
        blog_title: blogData.title,
        blog_description: blogData.description,
        blog_read_time: blogData.readTime,
        blog_tags: blogData.tags,
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

const getSermons = async () => {
  try {
    const response = await axios.get(`${API_URL}/blog/getallblogs`);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

// getblogbyid
const getSermonById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/blog/getblogbyid/${id}`);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

// deleteblog
const deleteSermon = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/blog/deleteblog/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

//updateblog/editblog

const updateSermon = async (blogData) => {
  try {
    const response = await axios.put(
      `${API_URL}/blog/updateblog/${blogData.blog_id}`,
      {
        blog_id: blogData.blog_id,
        blog_title: blogData.blog_title,
        // blog_description: blogData.description,
        // blog_read_time: blogData.readTime,
        blog_tags: blogData.blog_tags,
        blog_content: blogData.blog_content,
        blog_author: blogData.blog_author,
        // blog_image_url: blogData.imageUrl,
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

export {
  createNewSermonPost,
  getSermons,
  getSermonById,
  deleteSermon,
  updateSermon,
};
