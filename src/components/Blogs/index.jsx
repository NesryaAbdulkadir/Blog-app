import { Delete, Edit } from "lucide-react";
import React, { useState } from "react";

export default function Blog({ blogs, handleEdit, handleDelete }) {
  const [showMoreIndex, setShowMoreIndex] = useState(null);
  function handleTruncate(index) {
    setShowMoreIndex(showMoreIndex === index ? null : index);
  }

  return (
    <div className="blogs">
      <h1 className="label">Blogs</h1>
      {blogs?.map((blog, index) => (
        <div
          key={index}
          className={showMoreIndex === index ? "blog blog-more" : "blog"}
        >
          <div className="header">
            <h1 className="title">{blog.title}</h1>
            <span className="buttons">
              <Edit onClick={() => handleEdit(index)} className="btn" />
              <Delete onClick={() => handleDelete(index)} className="btn" />
            </span>
          </div>
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: blog.blog }}
          />
          {showMoreIndex === index ? (
            <small
              onClick={(e) => handleTruncate(index, e)}
              className="truncatebtn"
            >
              Less{">>"}
            </small>
          ) : (
            <small
              onClick={() => handleTruncate(index)}
              className="truncatebtn"
            >
              Read More{">>"}
            </small>
          )}
        </div>
      ))}
    </div>
  );
}
