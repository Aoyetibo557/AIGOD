import React from "react";
import "./blog.css";
import Layout from "../../components/Layout/layout";
import CreateNewBlog from "../../components/blog/createnewblog";

const NewBlogPost = () => {
  return (
    <Layout>
      <div className="newblog__post">
        <h1>Create New Blog Post</h1>
      </div>

      <CreateNewBlog />
    </Layout>
  );
};

export default NewBlogPost;
