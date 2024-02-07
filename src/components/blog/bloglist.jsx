import React from "react";
import { Button } from "@chakra-ui/react";
import "./bloglist.css";
import { BlogCard } from "./blogcard";

const blogs = [
  {
    blogId: 1,
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    read_time: "5 min read",
    author: "Author Name",
    author_image: "https://via.placeholder.com/150",
    image: "https://via.placeholder.com/150",
    date: "2021-09-01",
  },
  {
    blogId: 2,
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    read_time: "5 min read",
    author: "Author Name 2",
    author_image: "https://via.placeholder.com/150",
    image: "https://via.placeholder.com/150",
    date: "2021-09-01",
  },
  {
    blogId: 2,
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    read_time: "5 min read",
    author: "Author Name 2",
    author_image: "https://via.placeholder.com/150",
    image: "https://via.placeholder.com/150",
    date: "2021-09-01",
  },
  {
    blogId: 2,
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    read_time: "5 min read",
    author: "Author Name 2",
    author_image: "https://via.placeholder.com/150",
    image: "https://via.placeholder.com/150",
    date: "2021-09-01",
  },

  {
    blogId: 2,
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    read_time: "5 min read",
    author: "Author Name 2",
    author_image: "https://via.placeholder.com/150",
    image: "https://via.placeholder.com/150",
    date: "2021-09-01",
  },

  {
    blogId: 2,
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    read_time: "5 min read",
    author: "Author Name 2",
    author_image: "https://via.placeholder.com/150",
    image: "https://via.placeholder.com/150",
    date: "2021-09-01",
  },
];

const BlogList = () => {
  return (
    <div className="bloglist">
      <div className="bloglist__cards">
        {blogs.map((blog) => (
          <BlogCard key={blog.blogId} {...blog} />
        ))}
      </div>

      <Button
        colorScheme="teal"
        variant="outline"
        size="md"
        className="bloglist__button">
        View All Posts
      </Button>
    </div>
  );
};

export default BlogList;
