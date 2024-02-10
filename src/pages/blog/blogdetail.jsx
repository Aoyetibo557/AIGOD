import React from "react";
import { SingleBlog } from "../../components/blog/singleblog";
import { useParams } from "react-router-dom";
import Layout from "../../components/Layout/layout";

const BlogDetail = () => {
  const { blogId } = useParams();
  return (
    <Layout>
      <SingleBlog blogId={blogId} />
    </Layout>
  );
};

export default BlogDetail;
