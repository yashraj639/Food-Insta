import React from "react";

const Input = ({ id, label, type = "text", placeholder }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium mb-2">
      {label}
    </label>
    <input
      id={id}
      name={id}
      type={type}
      placeholder={placeholder}
      className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2"
      style={{
        borderColor: "var(--color-muted)",
        backgroundColor: "var(--color-bg)",
        color: "var(--color-text)",
        boxShadow: "inset 0 1px 3px rgba(0,0,0,0.05)",
      }}
    />
  </div>
);

export default Input;
