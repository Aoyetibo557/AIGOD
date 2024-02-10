import React, { useState, useMemo, useRef, useCallback } from "react";
import { Button } from "@chakra-ui/react";
import QuillEditor from "react-quill";
import { useAuth } from "../../utils/hooks/useAuth";
import { ViewNewBlog } from "./viewnewblog";
import "./createnewblog.css";
import "react-quill/dist/quill.snow.css";

const CreateNewBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");

  // editorRef is used to get the value of the editor
  const quill = useRef();

  // check if the user is authenticated, if not redirect to login

  const imageHandler = useCallback(() => {
    // Create an input element of type 'file'
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    // When a file is selected
    input.onchange = () => {
      const file = input.files[0];
      const reader = new FileReader();

      // Read the selected file as a data URL
      reader.onload = () => {
        const imageUrl = reader.result;
        const quillEditor = quill.current.getEditor();

        // Get the current selection range and insert the image at that index
        const range = quillEditor.getSelection(true);
        quillEditor.insertEmbed(range.index, "image", imageUrl, "user");
      };

      reader.readAsDataURL(file);
    };
  }, []);

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
          ["link", "image"],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      clipboard: {
        matchVisual: true,
      },
    }),
    [imageHandler]
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
    "image",
    "color",
    "clean",
  ];

  //

  const handleNewBlogSubmit = (e) => {
    e.preventDefault();
    const newBlog = {
      title,
      description,
      content: value,
    };
    console.log(newBlog);
    setTitle("");
    setDescription("");
    setValue("");
  };

  return (
    <div className="blog__container ">
      <div className="newblog__container">
        <form className="newblog__form">
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
              rows="5"
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

          <Button
            colorScheme="teal"
            variant="solid"
            type="submit"
            className="newblog__submit"
            onClick={handleNewBlogSubmit}>
            Submit Blog
          </Button>
        </form>
      </div>

      <div>
        <ViewNewBlog blog={{ title, description, content: value }} />
      </div>
    </div>
  );
};

export default CreateNewBlog;
