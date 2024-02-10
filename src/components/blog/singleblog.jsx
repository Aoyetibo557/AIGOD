import React, { useState, useEffect, useMemo } from "react";
import "./singleblog.css";
import { Button, Avatar } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { getBlogById } from "../../queries/blog";
import { formatDate } from "../../utils/commonfunctions";
import parse from "html-react-parser";

export const SingleBlog = ({ blogId }) => {
  const [blog, setBlog] = useState({});
  const navigate = useNavigate();

  const fetchBlog = async () => {
    const blogData = await getBlogById(blogId);
    setBlog(blogData?.blog);
  };

  const blogDetails = useMemo(() => {
    return fetchBlog();
  }, [blogId]);

  return blog ? (
    <div className="blogdetails__container">
      <Button
        colorScheme="blue"
        variant="outline"
        size="sm"
        className="blogdetails__back__button"
        onClick={() => navigate(-1)}>
        Go Back
      </Button>

      <div className="blogdetails">
        <div className="blogdetails__title">{blog.blog_title}</div>
        <div className="blogdetails__div">
          <div className="blogdetails__author">
            <Avatar
              size="sm"
              name={blog.author_name}
              src={blog.author_image_url}
            />
            <span className="blogdetails__author-name ">
              {blog.author_name}
            </span>
          </div>
          <div className="blog__created_date">
            {formatDate(blog.created_date)}
          </div>
        </div>
        <div>
          <img
            src={blog.blog_image_url}
            alt={blog.blog_title}
            loading="eager"
            className="blogdetails__image"
          />
        </div>

        <div>
          <div
            className="blog__content"
            dangerouslySetInnerHTML={{ __html: blog.blog_content }}
          />
        </div>
      </div>
    </div>
  ) : (
    <div>
      <p>Loading...</p>
    </div>
  );
};

SingleBlog.propTypes = {
  blogId: PropTypes.string,
};
