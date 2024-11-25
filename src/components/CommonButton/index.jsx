import React from "react";

export default function CommonButton({ buttonText, type }) {
  return <button type={type || "submit"}>{buttonText}</button>;
}
