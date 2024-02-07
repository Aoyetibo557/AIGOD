import React from "react";
import "./blog.css";
import Layout from "../../components/Layout/layout";
import BlogBannerImage from "../../images/blogbanner.png";
import BlogList from "../../components/blog/bloglist";

const BlogPage = () => {
  return (
    <Layout>
      <div className="blog__container">
        <div className="blog__body">
          <section className="blog__banner">
            <img
              src={BlogBannerImage}
              alt="Blog Page Banner"
              className="blog__banner-image"
            />
          </section>

          <section className="blog__bloglist">
            <div>
              <h3 className="blog__h3">Latest Posts</h3>
            </div>
            <BlogList />
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default BlogPage;
