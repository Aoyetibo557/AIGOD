import React, {
  useState,
  useMemo,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "@chakra-ui/react";
import QuillEditor from "react-quill";
import { useAuth } from "../../utils/hooks/useAuth";
import { ViewNewBlog } from "./viewnewblog";
import "./createnewblog.css";
import "react-quill/dist/quill.snow.css";
import { NotificationAlert } from "../alert/notificationalert";
import { createNewBlogPost } from "../../queries/blog";
import {
  changeImageFileName,
  uploadToS3,
  fetchProfileImage,
  constructImageUrl,
} from "../../utils/s3";

const CreateNewBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [file, setFile] = useState(null);
  const [readTime, setReadTime] = useState(0);
  const [imageName, setImageName] = useState("");
  const [msgType, setMsgType] = useState("error");
  const [error, setError] = useState(null);

  const { username: memoizedUsername } = useAuth();
  const userId = localStorage.getItem("aigod_userId");
  const navigate = useNavigate();

  // editorRef is used to get the value of the editor
  const quill = useRef();

  const imageHandler = () => {};

  const handleImageChange = (event) => {
    setImageName("");
    if (event.target.files[0]) {
      setFile(event.target.files[0]);
      if (event.target.files[0].size > 1000000) {
        setError("Image size too large, please upload an image less than 1MB");
        setMsgType("error");
      } else if (
        event.target.files[0].type !== "image/png" &&
        event.target.files[0].type !== "image/jpeg"
      ) {
        setError(
          "Image format not supported, please upload an image in jpeg or png format"
        );
        setMsgType("error");
      } else if (
        event.target.files[0].type === "image/png" ||
        event.target.files[0].type === "image/jpeg"
      ) {
        const newFileName = changeImageFileName({
          fileName: file?.name,
          origin: "blog",
          userId: userId,
        });

        setImageName(newFileName);
      }
    }
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [2, 3, 4, false] }],
          ["bold", "italic", "underline", "blockquote"],
          [{ color: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link"],
          ["clean"],
        ],
      },
      clipboard: {
        matchVisual: true,
      },
    }),
    []
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "color",
    "clean",
  ];

  const validateInput = () => {
    setError("");
    if (title === "" || readTime == 0 || description === "" || value === "") {
      setError("Please fill in all fields");
      setMsgType("error");
      return false;
    }
    if (readTime < 0 || readTime > 1000) {
      setError("Please enter a valid read time");
      setMsgType("error");
      return false;
    } else if (file === null) {
      setError("Please upload an image");
      setMsgType("error");
    } else if (imageName === "") {
      setError("Please upload an image");
      setMsgType("error");
      return false;
    }

    return true;
  };

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setValue("");
    setReadTime(0);
    setImageName("");
  };

  const handleNewBlogSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateInput()) {
      return;
    } else {
      try {
        const imageUrl = constructImageUrl(imageName, "blogs");
        const newBlog = {
          title,
          readTime,
          userId,
          description,
          content: value,
          imageUrl,
        };
        const res = await createNewBlogPost(newBlog);
        if (res.status === "success") {
          const { fileName, url } = await uploadToS3({
            file,
            fileName: imageName,
            userId,
            location: "blogs",
          });

          setError("Blog created successfully");
          setMsgType("success");
          clearForm();

          navigate(`/blog/${res?.blog.blog_id}`);
        } else {
          setError("Error creating blog");
          setMsgType("error");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="blog__container ">
      <div className="newblog__container">
        <form className="newblog__form">
          {error && <NotificationAlert type={msgType} message={error} />}
          <div>
            <label htmlFor="imageInput" className="newblog__label">
              <span>Blog Image</span>

              <Input id="imageInput" type="file" onChange={handleImageChange} />
            </label>
          </div>
          <div>
            <label htmlFor="readtime" className="newblog__label">
              Read Time
            </label>
            <input
              id="readtime"
              name="readtime"
              type="number"
              className="newblog__input"
              placeholder="Read Time (in minutes)"
              value={readTime}
              onChange={(e) => setReadTime(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="title" className="newblog__label">
              Blog Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              className="newblog__input"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="description" className="newblog__label">
              Blog Description
            </label>
            <textarea
              id="description"
              name="description"
              type="text"
              className="newblog__textarea"
              placeholder="Enter Description"
              value={description}
              rows="3"
              onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>
          <div>
            <label htmlFor="content" className="newblog__label">
              Blog Content
            </label>
            <QuillEditor
              ref={(el) => (quill.current = el)}
              theme="snow"
              value={value}
              formats={formats}
              modules={modules}
              onChange={setValue}
              styles={{ width: "300px" }}
              className="quill__editor"
              placeholder={"Write something awesome..."}
            />
          </div>

          <div className="newblog__submit">
            <Button
              colorScheme="teal"
              variant="solid"
              type="submit"
              onClick={handleNewBlogSubmit}>
              Submit Blog
            </Button>
          </div>
        </form>
      </div>

      <div>
        <ViewNewBlog
          blog={{
            image: imageName,
            title,
            readTime,
            description,
            content: value,
          }}
        />
      </div>
    </div>
  );
};

export default CreateNewBlog;
