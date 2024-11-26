import React, { Fragment, useEffect, useState } from "react";
import Blog from "../../components/Blogs";
import { useBlog } from "../../context/BlogContext";
import Editor from "../../components/Editor";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

export default function Blogs() {
  const { blogs, deleteBlog, editingBlog, addBlog, saveInLocalStorage } =
    useBlog();
  console.log("Blogs component rendered", blogs);

  const [showEditor, setShowEditor] = useState(false);
  const [value, setValue] = useState("");
  const [editBlog, setEditBlog] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ align: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        ["link"],
      ],
    },
    placeholder: "Write your thoughts here...",
  });

  const handleSubmit = (e) => {
    window.location.reload();
    const newBlog = { blog: quill.root.innerHTML, title: value };

    if (editBlog) {
      editingBlog(editIndex, newBlog);
    } else {
      addBlog(newBlog);
    }

    resetEditor();
  };

  const resetEditor = () => {
    setShowEditor(false);
    setEditBlog(null);
    setEditIndex(null);
    setValue("");
    if (quill) {
      quill.root.innerHTML = ""; // Clear Quill content
      quill.disable(); // Disable editor
    }
  };

  const handleEdit = (index) => {
    if (index >= 0 && index < blogs.length) {
      const currentBlog = blogs[index];
      setEditBlog(currentBlog);
      setEditIndex(index);
      setValue(currentBlog.title);
      setShowEditor(true);
    }
  };

  const handleDelete = (index) => {
    deleteBlog(index);
    saveInLocalStorage();
  };

  useEffect(() => {
    if (quill && showEditor && editBlog) {
      // Add a small delay to ensure the editor is mounted
      setTimeout(() => {
        quill.root.innerHTML = editBlog.blog || "";
        quill.enable();
        quill.focus();
      }, 0);
    }
  }, [showEditor, editBlog, quill]);

  return (
    <Fragment>
      <Blog blogs={blogs} handleDelete={handleDelete} handleEdit={handleEdit} />
      {showEditor && (
        <div
          className="w-screen m-auto absolute top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.23)] z-10"
          onClick={resetEditor}
        >
          <Editor
            value={value}
            setValue={setValue}
            quillRef={quillRef}
            handleSubmit={handleSubmit}
          />
        </div>
      )}
    </Fragment>
  );
}
