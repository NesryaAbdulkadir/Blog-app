import { useEffect, useState } from "react";
import Blog from "../../components/Blogs";
import Editor from "../../components/Editor";
import { useQuill } from "react-quilljs";
import { useBlog } from "../../context/BlogContext";

export default function Dashboard() {
  const { blogs, deleteBlog, editingBlog, addBlog, saveInLocalStorage } =
    useBlog();
  const [editBlog, setEditBlog] = useState(null);
  const [value, setValue] = useState("");

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
    // theme,
    modules,
    // formats,
    placeholder,
  });

  function handleSubmit(e) {
    console.log("submit");

    e.preventDefault();
    const newBlog = { blog: quill.root.innerHTML, title: value };

    if (editBlog?.title) {
      // const editedBlogs = blogs.map((blog) =>
      //   blog.title === editBlog.title ? { ...blog, ...newBlog } : blog
      // );
      // setBlogs(editedBlogs);
      editingBlog(editBlog, newBlog);
      setEditBlog({ blog: "", title: "" });
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
    if (index >= 0 && index < blogs.length) {
      const currentBlog = blogs[index];

      console.log(currentBlog.blog);

      setEditBlog({
        title: currentBlog.title,
        blog: currentBlog.blog,
      });

      setValue(currentBlog.title);
      quill.root.innerHTML = currentBlog.blog;
    }
  }
  return (
    <div>
      <Editor
        value={value}
        setValue={setValue}
        quillRef={quillRef}
        handleSubmit={handleSubmit}
      />
      <Blog blogs={blogs} handleDelete={handleDelete} handleEdit={handleEdit} />
    </div>
  );
}
