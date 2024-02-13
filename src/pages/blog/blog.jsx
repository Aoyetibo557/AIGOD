import React from "react";
import "./blog.css";
import { Button } from "@chakra-ui/react";
import Layout from "../../components/Layout/layout";
import BlogBannerImage from "../../images/blogbanner.png";
import BlogList from "../../components/blog/bloglist";
import { useAuth } from "../../utils/hooks/useAuth";
import { useUser } from "../../utils/hooks/useUser";
import { useUserRoles } from "../../utils/hooks/useUserRoles";
import { ImageLoader } from "../../components/imageloader/imageloader";

const BlogPage = () => {
  const { username } = useAuth();
  const { profile } = useUser(username || "");
  const { userRoles, isLoading, isError } = useUserRoles(profile?.id);
  const canCreateBlog = userRoles.includes("admin");

  return (
    <Layout>
      <div className="blog__container">
        <div className="blog__body">
          {!isLoading && canCreateBlog && (
            <div className="blog__btn">
              <Button
                colorScheme="blue"
                variant="outline"
                size="sm"
                onClick={() => {
                  window.location.href = "/create-new-blog";
                }}>
                + Create New Blog
              </Button>
            </div>
          )}

          <section className="blog__banner">
            <ImageLoader
              src={BlogBannerImage}
              alt="Blog Page Banner"
              width="100%"
              height="500px"
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
