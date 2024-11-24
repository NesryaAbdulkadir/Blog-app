import React, { Fragment, useEffect, useState } from "react";
import Blog from "../../components/Blogs";
import { useBlog } from "../../context/BlogContext";
import Editor from "../../components/Editor";
import { useQuill } from "react-quilljs";

export default function Blogs() {
  const {
    blogs,
    setBlogs,
    deleteBlog,
    editingBlog,
    addBlog,
    saveInLocalStorage,
  } = useBlog();
  const [showEditor, setShowEditor] = useState(false);
  const [value, setValue] = useState("");
  const [editBlog, setEditBlog] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ align: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      ["link"],
    ],
  };
  const placeholder = "Write Your thoughts here...";
  const { quill, quillRef } = useQuill({
    modules,
    placeholder,
  });
  function handleSubmit(e) {
    setShowEditor(false);

    e.preventDefault();
    const newBlog = { blog: quill.root.innerHTML, title: value };

    if (editBlog !== null) {
      // const editedBlogs = blogs.map((blog) =>
      //   blog.title === editBlog.title ? { ...blog, ...newBlog } : blog
      // );
      // setBlogs(editedBlogs);
      editingBlog(editIndex, newBlog);

      setEditBlog(null);
    } else {
      addBlog(newBlog);
    }
    setValue("");
    quill.root.innerHTML = "";
  }

  function handleDelete(index) {
    deleteBlog(index);
    saveInLocalStorage();
  }

  function handleEdit(index) {
    setShowEditor(true);
    if (index >= 0 && index < blogs.length) {
      const currentBlog = blogs[index];

      // console.log(currentBlog.blog);

      setEditBlog({
        title: currentBlog.title,
        blog: currentBlog.blog,
      });
      // console.log(editBlog);
      setEditIndex(index);

      setValue(currentBlog.title);
    }
  }

  function handleClose() {
    setShowEditor(false);
    setEditBlog(null);
  }

  useEffect(() => {
    if (showEditor && editBlog && quill) {
      quill.root.innerHTML = editBlog.blog; // Update Quill content
    }
  }, [editBlog, showEditor, quill]);
  return (
    <Fragment>
      <Blog blogs={blogs} handleDelete={handleDelete} handleEdit={handleEdit} />
      {showEditor ? (
        <div className="blogPageEditor" onClick={handleClose}>
          <div onClick={(e) => e.stopPropagation()}>
            <Editor
              value={value}
              setValue={setValue}
              quillRef={quillRef}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      ) : null}
    </Fragment>
  );
}
