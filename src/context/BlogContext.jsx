import { createContext, useContext, useEffect, useState } from "react";

const BlogContext = createContext("");

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);

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

  function addBlog(newBlog) {
    setBlogs((blogs) => [...blogs, newBlog]);
  }

  function deleteBlog(index) {
    setBlogs((blog) => blog.filter((_, i) => i !== index));
  }
  function editingBlog(index, updatedBlog) {
    setBlogs((prevBlogs) => {
      const blogCopy = [...prevBlogs];
      blogCopy[index] = updatedBlog;
      return blogCopy;
    });
  }

  return (
    <BlogContext.Provider
      value={{
        blogs,
        setBlogs,
        deleteBlog,
        editingBlog,
        addBlog,
        saveInLocalStorage,
        getBlogsFromLocalStorage,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};
export const useBlog = () => {
  return useContext(BlogContext);
};
export default { BlogProvider, useBlog };
