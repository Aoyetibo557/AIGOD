import React from "react";
import PropTypes from "prop-types";
import parse from "html-react-parser";
import { Avatar } from "@chakra-ui/react";
import { ImageLoader } from "../imageloader/imageloader";
import "./viewnewsermon.css";

export const ViewNewSermon = ({ blog }) => {
  return (
    <div className="viewblog__container">
      <div>
        <div>
          <div className="view__div-item">
            {blog?.tags?.map((tag, index) => (
              <span className="view__tag" key={index}>
                {tag}
              </span>
            ))}
          </div>
          <div className="view__div-item view__div-item-title">
            {blog.title}
          </div>
          <div className="view__div-avatar">
            <Avatar
              size="sm"
              name={blog.author?.name}
              src={blog.author?.avatar}
            />
            <span className="view__author">
              {blog.author?.name || "Author"}
            </span>
            <span className="view__div-item">{new Date().toDateString()}</span>
          </div>
        </div>
        <div className="view__div">
          <ImageLoader
            src={blog.image}
            alt={blog.title}
            width="100%"
            height="300px"
          />
          {blog.image}
        </div>
        <div className="view__div-item">
          <span className="view__tag">{blog.readTime} min read</span>
        </div>

        <div className="view__div">
          {/* <div className="view__div-item">{parse(blog.content)}</div> */}

          <div
            className="view__div-item"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>

        {/* <div className="view__div">
          <h3 className="view__title">Blog Description</h3>
          <div
            className="view__div-item"
            style={{ display: "flex", alignItems: "center" }}>
            {blog.description}
          </div>
        </div> */}
      </div>
    </div>
  );
};

ViewNewSermon.propTypes = {
  blog: PropTypes.object,
};
