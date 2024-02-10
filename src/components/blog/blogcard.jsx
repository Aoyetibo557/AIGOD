import React from "react";
import { Link } from "react-router-dom";
import "./blogcard.css";
import { Avatar } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { formatDate } from "../../utils/commonfunctions";

export const BlogCard = ({
  blog_title,
  created_date,
  author_name,
  author_image_url,
  blog_image_url,
  blog_description,
  blog_read_time,
  blog_id,
}) => {
  return (
    <Link to={`/blog/${blog_id}`} className="blogcard">
      <div className="blogcard__top">
        <img src={blog_image_url} alt={blog_title} className="blogcard__img" />
        <span className="blogcard__readtime">{blog_read_time} min read </span>
      </div>
      <h3 className="blogcard__title">{blog_title}</h3>
      <div className="blogcard__bottom">
        <div className="blogcard__author__div">
          <Avatar src={author_image_url} size="sm" />
          <div className="blogcard__author">{author_name}</div>
        </div>
        <p className="blogcard__date">{formatDate(created_date)}</p>
      </div>
    </Link>
  );
};

BlogCard.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  author: PropTypes.string,
  author_image: PropTypes.string,
  image: PropTypes.string,
  description: PropTypes.string,
  read_time: PropTypes.string,
  link: PropTypes.string,
};
