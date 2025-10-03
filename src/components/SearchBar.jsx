import React from "react";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-row" style={{ flex: 1 }}>
      <input
        className="input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by name or email..."
      />
    </div>
  );
}
