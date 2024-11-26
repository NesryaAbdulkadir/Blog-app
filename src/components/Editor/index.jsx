import React, { useEffect, useState } from "react";

import "quill/dist/quill.snow.css";

export default function Editor({ value, setValue, quillRef, handleSubmit }) {
  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      onClick={(e) => e.stopPropagation()}
      className="flex flex-col max-h-max gap-5 lg:w-[70%] md:w-[80%] sm:w-[90%] w-[100%] m-auto mb-20 mt-5 bg-white p-10 rounded-md"
    >
      <input
        type="text"
        name="title"
        id="title"
        placeholder="Enter Title Here..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="bg-transparent border-none w-full lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-bold text-[#494949] outline-none p-2 "
        required
        autoFocus
      />
      <div className="w-full max-h-max text-xl">
        <div ref={quillRef} />
      </div>
      <div>
        <button
          type="submit"
          className="bg-[#494949] text-white px-5 py-2 rounded-md text-xl cursor-pointer mt-5"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
