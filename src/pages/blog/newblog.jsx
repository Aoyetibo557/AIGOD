import React from "react";
import "./blog.css";
import Layout from "../../components/Layout/layout";
import CreateNewBlog from "../../components/blog/createnewblog";

const NewBlogPost = () => {
  return (
    <Layout>
      <CreateNewBlog />
    </Layout>
  );
};

export default NewBlogPost;
