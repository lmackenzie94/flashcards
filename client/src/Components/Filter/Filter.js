import React from "react";

const Filter = props => {
  return (
    <div>
      <select
        onChange={props.handleFilter}
        name="currentFilter"
        value={props.currentFilter}
      >
        <option value="HTML">HTML</option>
        <option value="CSS">CSS</option>
        <option value="JavaScript">JavaScript</option>
      </select>
    </div>
  );
};

export default Filter;
