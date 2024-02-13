import React, { useState, useEffect, useMemo } from "react";
import { Button } from "@chakra-ui/react";
import "./bloglist.css";
import { BlogCard } from "./blogcard";
import { getBlogs } from "../../queries/blog";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBlogs = async () => {
    const blogData = await getBlogs();
    setBlogs(blogData?.blogs);
  };

  //useMemo to store the value of the blogs so that it doesn't get recalculated on every render
  const blogList = useMemo(() => {
    try {
      setIsLoading(true);
      return fetchBlogs();
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return blogs?.length > 0 ? (
    <div className="bloglist">
      <div className="bloglist__cards">
        {blogs?.map((blog) => (
          <BlogCard key={blog.blog_id} {...blog} />
        ))}
      </div>

      {/* Switch this to pagination! */}
      {/* <Button
        colorScheme="teal"
        variant="outline"
        size="md"
        className="bloglist__button">
        View All Posts
      </Button> */}
    </div>
  ) : (
    <div>
      <p>No blogs found</p>
    </div>
  );
};

export default BlogList;
