import React, { useState, useEffect } from "react";
import { Spin } from "antd";
import "./sermonlist.css";
import { SermonCard } from "./sermoncard";
import { getSermons } from "../../queries/sermon";

const SermonList = () => {
  const [sermons, setSermons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSermons = async () => {
      setIsLoading(true);
      try {
        const blogData = await getSermons();
        setSermons(blogData?.blogs || []);
      } catch (error) {
        console.error("Error fetching sermons:", error);
        setError("Error fetching sermons. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSermons();
  }, []);

  if (isLoading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bloglist">
      <div className="bloglist__cards">
        {sermons.length > 0 ? (
          sermons
            .map((sermon) => <SermonCard key={sermon.blog_id} {...sermon} />)
            .reverse()
        ) : (
          <p>No sermon found</p>
        )}
      </div>
    </div>
  );
};

export default SermonList;
