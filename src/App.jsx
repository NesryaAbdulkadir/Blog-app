import { useEffect, useState } from "react";
import Blog from "./components/Blogs";
import Editor from "./components/Editor";
import { useQuill } from "react-quilljs";

export default function App() {
  const [blogs, setBlogs] = useState([]);

  const [value, setValue] = useState("");
  const [editBlog, setEditBlog] = useState({
    blog: "",
    title: "",
  });

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

  useEffect(() => {
    getBlogsFromLocalStorage();
  }, []);

  useEffect(() => {
    saveInLocalStorage();
  }, [blogs]);

  function saveInLocalStorage() {
    if (blogs?.length > 0) {
      localStorage.setItem("blogs", JSON.stringify(blogs));
    } else {
      localStorage.removeItem("blogs");
    }
  }
  function getBlogsFromLocalStorage() {
    const retrievedBlogs = localStorage.getItem("blogs");
    if (retrievedBlogs?.length > 0) {
      const blogs = JSON.parse(retrievedBlogs);
      setBlogs(blogs);
    }
    return [];
  }

  function handleDelete(index) {
    const newBlogs = blogs.filter((_, i) => i !== index);
    console.log(newBlogs);

    setBlogs(newBlogs);
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
        setBlogs={setBlogs}
        blogs={blogs}
        value={value}
        setValue={setValue}
        quillRef={quillRef}
        quill={quill}
        editBlog={editBlog}
        setEditBlog={setEditBlog}
      />
      <Blog blogs={blogs} handleDelete={handleDelete} handleEdit={handleEdit} />
    </div>
  );
}
