import React from "react";

export default function CommonInput({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
