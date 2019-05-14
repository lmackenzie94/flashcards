import React from "react";

const Filter = props => {
  return (
    <div>
      <select onChange={props.handleFilter} value={props.currentFilter}>
        <option defaultValue value="noFilter">
          No Filter
        </option>
        <option value="HTML">HTML</option>
        <option value="CSS">CSS</option>
        <option value="JavaScript">JavaScript</option>
      </select>
    </div>
  );
};

export default Filter;
