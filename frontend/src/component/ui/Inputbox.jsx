import React from "react";

export default function Inputbox({
  name,
  type = "text",
  placeholder = "",
  value,
  onChange,
  required = false,
}) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-4 py-2 border border-gray-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-transparent"
    />
  );
}
