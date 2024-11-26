import React from "react";

export default function CommonButton({ buttonText, type }) {
  return (
    <button
      type={type || "submit"}
      className="bg-blue-300 hover:bg-blue-400 mb-10 max-w-max py-2 px-4 rounded-md"
    >
      {buttonText}
    </button>
  );
}
