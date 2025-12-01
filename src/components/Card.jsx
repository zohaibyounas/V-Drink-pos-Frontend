import React from "react";
export default function Card({ title, children, className = "" }) {
  return (
    <div className={`p-4 rounded-2xl glass ${className}`}>
      <div className="card-header p-3 rounded-t-xl">
        <h3 className="text-sm font-medium text-gray-700">{title}</h3>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}
