import React from "react";

function GroupSelector({ onChange, selected }) {
  return (
    <select
      value={selected}
      onChange={(e) => onChange(e.target.value)}
      className="group-selector"
    >
      <option value="status">Group by Status</option>
      <option value="user">Group by User</option>
      <option value="priority">Group by Priority</option>
    </select>
  );
}

export default GroupSelector;
