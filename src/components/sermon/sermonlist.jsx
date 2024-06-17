import React, { useState, useEffect, useMemo } from "react";
import { Button } from "@chakra-ui/react";
import "./sermonlist.css";
import { SermonCard } from "./sermoncard";
import { getSermons } from "../../queries/sermon";

const SermonList = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSermons = async () => {
    const blogData = await getSermons();
    setBlogs(blogData?.blogs);
  };

  //useMemo to store the value of the blogs so that it doesn't get recalculated on every render
  const blogList = useMemo(() => {
    try {
      setIsLoading(true);
      return fetchSermons();
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return blogs?.length > 0 ? (
    <div className="bloglist">
      <div className="bloglist__cards">
        {blogs
          ?.map((blog) => <SermonCard key={blog.blog_id} {...blog} />)
          .reverse()}
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
      <p>No sermon found</p>
    </div>
  );
};

export default SermonList;
