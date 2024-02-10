import React from "react";
import PropTypes from "prop-types";
import parse from "html-react-parser";
import "./viewnewblog.css";

export const ViewNewBlog = ({ blog }) => {
  return (
    <div className="viewblog__container">
      <div>
        <div className="view__div">
          <h3 className="view__title">Blog Image Name</h3>
          {blog.image}
        </div>
        <div className="view__div">
          <h3 className="view__title">Blog Read Time</h3>
          <div className="view__div-item">{blog.readTime}</div>
        </div>

        <div className="view__div">
          <h3 className="view__title">Blog Title</h3>
          <div className="view__div-item-title">{blog.title}</div>
        </div>

        <div className="view__div">
          <h3 className="view__title">Blog Description</h3>
          <div
            className="view__div-item"
            style={{ display: "flex", alignItems: "center" }}>
            {blog.description}
          </div>
        </div>
        <div className="view__div">
          <h3 className="view__title">Blog Content</h3>
          <div className="view__div-item">{parse(blog.content)}</div>
        </div>
      </div>
    </div>
  );
};

ViewNewBlog.propTypes = {
  blog: PropTypes.object,
};
