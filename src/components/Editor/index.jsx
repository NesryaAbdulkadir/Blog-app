import React, { useEffect, useState } from "react";

import "quill/dist/quill.snow.css";

export default function Editor({
  value,
  setValue,
  quillRef,
  quill,
  setBlogs,
  blogs,
  editBlog,
  setEditBlog,
}) {
  function handleSubmit(e) {
    console.log("submit");

    e.preventDefault();
    const newBlog = { blog: quill.root.innerHTML, title: value };

    if (editBlog.title) {
      const editedBlogs = blogs.map((blog) =>
        blog.title === editBlog.title ? { ...blog, ...newBlog } : blog
      );
      setBlogs(editedBlogs);
      setEditBlog({ blog: "", title: "" });
    } else {
      setBlogs([...blogs, { blog: quill.root.innerHTML, title: value }]);
    }
    setValue("");
    quill.root.innerHTML = "";
  }
  return (
    <form onSubmit={(e) => handleSubmit(e)} className="form">
      <input
        type="text"
        name="title"
        id="title"
        placeholder="Enter Title Here..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
        autoFocus
      />
      <div className="editor">
        <div ref={quillRef} className="editor-container" />
      </div>
      <div>
        <button type="submit" className="button">
          Submit
        </button>
      </div>
    </form>
  );
}
