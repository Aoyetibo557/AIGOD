import React, { useState, useEffect, useMemo } from "react";
import "./singleblog.css";
import {
  Button,
  Avatar,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { getBlogById, deleteBlog } from "../../queries/blog";
import { formatDate } from "../../utils/commonfunctions";
import parse from "html-react-parser";
import { useAuth } from "../../utils/hooks/useAuth";
import { useUser } from "../../utils/hooks/useUser";
import { useUserRoles } from "../../utils/hooks/useUserRoles";
import { ImageLoader } from "../imageloader/imageloader";

export const SingleBlog = ({ blogId }) => {
  const [blog, setBlog] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { username } = useAuth();
  const { profile } = useUser(username || "");
  const { userRoles, isLoading, isError } = useUserRoles(profile?.id);
  const navigate = useNavigate();

  const fetchBlog = async () => {
    const blogData = await getBlogById(blogId);
    setBlog(blogData?.blog);
  };

  const handleDelete = async () => {
    const response = await deleteBlog(blogId);
    if (response) {
      navigate(-1);
    }
  };

  const blogDetails = useMemo(() => {
    return fetchBlog();
  }, [blogId]);

  const isAdmin =
    userRoles?.includes("super admin") || userRoles?.includes("moderator");

  return blog ? (
    <div className="blogdetails__container">
      <div className="blogdetails__btns">
        <Button
          colorScheme="blue"
          variant="outline"
          size="sm"
          className="blogdetails__btn blogdetails__back__btn"
          onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </div>

      <div className="blogdetails">
        <div>
          <div className="blogdetails_tags">
            {blog.blog_tags?.map((tag, index) => {
              return (
                <span key={index} className="blog_tag">
                  {tag}
                </span>
              );
            })}
          </div>
        </div>
        <div className="blogdetails__title">{blog.blog_title}</div>
        <div className="blogdetails__topbar">
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

          {!isLoading && isAdmin && (
            <Button
              colorScheme="red"
              variant="outline"
              size="sm"
              className="blogdetails__btn"
              onClick={onOpen}>
              Delete Blog
            </Button>
          )}
        </div>
        <div>
          <ImageLoader
            src={blog.blog_image_url}
            alt={blog.blog_title}
            loading="eager"
            width="100%"
            height="400px"
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

      <Modal
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Blog</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>Are you sure you want to delete this blog?</p>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="red" onClick={handleDelete}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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
