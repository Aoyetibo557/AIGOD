// import { useMemo } from "react";

export const modules = {
  toolbar: {
    container: [
      [{ header: [2, 3, 4, false] }],
      ["bold", "italic", "underline", "blockquote"],
      [{ script: "sub" }, { script: "super" }],
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
};

export const formats = [
  "header",
  "font",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "script",
  "list",
  "bullet",
  "indent",
  "link",
  "color",
  "clean",
];

export const tagOptions = [
  { value: "technology", label: "Technology" },
  { value: "news", label: "News" },
  { value: "health", label: "Health" },
  { value: "sports", label: "Sports" },
  { value: "entertainment", label: "Entertainment" },
  { value: "lifestyle", label: "Lifestyle" },
  { value: "religion", label: "Religion" },
  { value: "politics", label: "Politics" },
  { value: "education", label: "Education" },
];
