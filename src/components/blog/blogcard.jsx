import React from "react";
import { Link } from "react-router-dom";
import "./blogcard.css";
import { Avatar } from "@chakra-ui/react";
import PropTypes from "prop-types";

export const BlogCard = ({
  title,
  date,
  author,
  author_image,
  image,
  description,
  read_time,
  blogId,
}) => {
  return (
    <Link to={`/blog/${blogId}`} className="blogcard">
      <div className="blogcard__top">
        <img src={image} alt={title} className="blogcard__img" />
        <span className="blogcard__readtime">{read_time}</span>
      </div>
      <h3 className="blogcard__title">{title}</h3>
      <div className="blogcard__bottom">
        <div className="blogcard__author__div">
          <Avatar src={author_image} size="sm" />
          <div className="blogcard__author">{author}</div>
        </div>
        <p className="blogcard__ate">{date}</p>
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
