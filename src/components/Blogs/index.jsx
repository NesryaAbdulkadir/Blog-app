import { Delete, Edit } from "lucide-react";
import React, { useState } from "react";

export default function Blog({ blogs, handleEdit, handleDelete }) {
  const [showMoreIndex, setShowMoreIndex] = useState(null);
  function handleTruncate(index) {
    setShowMoreIndex(showMoreIndex === index ? null : index);
  }

  return (
    <div className="lg:w-[70%] md:w-[80%] sm:w-[90%] w-[100%] m-auto p-5">
      <h1 className="text-4xl font-bold text-center">Blogs</h1>
      {blogs?.map((blog, index) => (
        <div
          key={index}
          className={`w-full relative p-5 flex flex-col gap-2 max-h-max h-[200px] border-b-2 border-gray-300 ${
            showMoreIndex === index ? "h-auto" : ""
          }`}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between ">
            <h1 className="text-2xl font-bold text-[rgb(73, 73, 73)]">
              {blog.title}
            </h1>
            <span className="flex gap-10">
              <Edit
                onClick={() => handleEdit(index)}
                className="cursor-pointer"
              />
              <Delete
                onClick={() => handleDelete(index)}
                className="cursor-pointer"
              />
            </span>
          </div>
          <div
            className="overflow-hidden text-ellipsis"
            dangerouslySetInnerHTML={{ __html: blog.blog }}
          />
          {showMoreIndex === index ? (
            <small
              onClick={(e) => handleTruncate(index, e)}
              className="cursor-pointer text-blue-600 underline"
            >
              Less{">>"}
            </small>
          ) : (
            <small
              onClick={() => handleTruncate(index)}
              className="cursor-pointer text-blue-600 underline"
            >
              Read More{">>"}
            </small>
          )}
        </div>
      ))}
    </div>
  );
}
