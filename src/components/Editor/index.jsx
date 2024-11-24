import React, { useEffect, useState } from "react";

import "quill/dist/quill.snow.css";

export default function Editor({ value, setValue, quillRef, handleSubmit }) {
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
