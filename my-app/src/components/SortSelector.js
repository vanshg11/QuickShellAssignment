import React from "react";

function SortSelector({ onChange, selected }) {
  return (
    <select
      value={selected}
      onChange={(e) => onChange(e.target.value)}
      className="sort-selector"
    >
      <option value="priority">Sort by Priority</option>
      <option value="title">Sort by Title</option>
    </select>
  );
}

export default SortSelector;
