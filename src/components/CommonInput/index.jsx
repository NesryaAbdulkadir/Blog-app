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
    <div className="flex flex-col gap-2">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full text-xl border-b-2 outline-none"
      />
    </div>
  );
}
