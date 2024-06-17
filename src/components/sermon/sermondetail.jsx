import React, { useState, useEffect, useMemo } from "react";
import "./sermondetail.css";
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
import QuillEditor from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  getSermonById,
  deleteSermon,
  updateSermon,
} from "../../queries/sermon";
import { formatDate } from "../../utils/commonfunctions";
import { Select } from "antd";
import parse from "html-react-parser";
import { useAuth } from "../../utils/hooks/useAuth";
import { useUser } from "../../utils/hooks/useUser";
import { useUserRoles } from "../../utils/hooks/useUserRoles";
import { ImageLoader } from "../imageloader/imageloader";
import { modules, formats, tagOptions } from "../../utils/const/quillconfig";

export const SermonDetail = ({ blogId }) => {
  const [blog, setBlog] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedBlog, setEditedBlog] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { username } = useAuth();
  const { profile } = useUser(username || "");
  const { userRoles, isLoading, isError } = useUserRoles(profile?.id);
  const navigate = useNavigate();

  const fetchBlog = async () => {
    const blogData = await getSermonById(blogId);
    setBlog(blogData?.blog);
    setEditedBlog(blogData?.blog);
  };

  const handleDelete = async () => {
    const response = await deleteSermon(blogId);
    if (response) {
      navigate("/sermons");
    }
  };

  const blogDetails = useMemo(() => {
    return fetchBlog();
  }, [blogId]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedBlog(blog); // Reset editedBlog state to current blog data
  };

  const handleSubmitEdit = async () => {
    const blogData = {
      blog_id: blog.blog_id,
      blog_title: editedBlog.blog_title,
      blog_content: editedBlog.blog_content,
      blog_tags: editedBlog.blog_tags,
      blog_author: profile?.id || editedBlog.blog_author,
      // blog_image_url: editedBlog.blog_image_url,
      // author_name: editedBlog.author_name,
      // author_image_url: editedBlog.author_image_url,
      // created_date: editedBlog.created_date,
    };
    const response = await updateSermon(blogData);
    if (response) {
      setIsEditing(false);
      setBlog(editedBlog); // Update current blog state with edited data
    }
  };

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
        {/* <div>
          {isEditing ? (
            <Select
              size="middle"
              mode="tags"
              className=""
              style={{ width: "45%", marginBottom: "20px" }}
              placeholder="Select Tags"
              onChange={(value) =>
                setEditedBlog({ ...editedBlog, blog_tags: value })
              }
              tokenSeparators={[","]}
              options={tagOptions}
              maxCount={2}
            />
          ) : (
            <div className="blogdetails_tags">
              {blog.blog_tags?.map((tag, index) => {
                return (
                  <span key={index} className="blog_tag">
                    {tag}
                  </span>
                );
              })}
            </div>
          )}
        </div> */}
        <div>
          {isEditing ? (
            <input
              type="text"
              className="blogdetails__title"
              value={editedBlog.blog_title}
              className="blogdetails__title__edit__input"
              onChange={(e) =>
                setEditedBlog({ ...editedBlog, blog_title: e.target.value })
              }
            />
          ) : (
            <div className="blogdetails__title">{blog.blog_title}</div>
          )}
        </div>
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

          <div>
            {!isLoading && isAdmin && (
              <>
                {!isEditing ? (
                  <>
                    <Button
                      colorScheme="green"
                      variant="outline"
                      size="sm"
                      className="blogdetails__btn"
                      onClick={handleEdit}>
                      Edit
                    </Button>
                    <Button
                      colorScheme="red"
                      variant="outline"
                      size="sm"
                      className="blogdetails__btn"
                      onClick={onOpen}>
                      Delete Sermon
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      colorScheme="blue"
                      variant="outline"
                      size="sm"
                      className="blogdetails__btn"
                      onClick={handleSubmitEdit}>
                      Save
                    </Button>
                    <Button
                      colorScheme="red"
                      variant="outline"
                      size="sm"
                      className="blogdetails__btn"
                      onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                  </>
                )}
              </>
            )}
          </div>
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
          {!isEditing ? (
            <div
              className="blog__content"
              dangerouslySetInnerHTML={{ __html: blog.blog_content }}
            />
          ) : (
            <QuillEditor
              theme="snow"
              value={editedBlog.blog_content}
              formats={formats}
              modules={modules}
              onChange={(e) =>
                setEditedBlog({ ...editedBlog, blog_content: e })
              }
              styles={{ width: "300px", marginBottom: "50px" }}
              className=""
            />
          )}
        </div>
      </div>

      <Modal
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Sermon</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>Are you sure you want to delete this sermon?</p>
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

SermonDetail.propTypes = {
  blogId: PropTypes.string,
};
