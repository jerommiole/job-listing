import React from "react";

const SortDropdown = ({ onSortChange }) => {
  const handleChange = (e) => {
    onSortChange(e.target.value);
  };

  return (
    <div className="job-sort-dropdown">
      <label htmlFor="sort">Sort by:</label>
      <select id="sort" onChange={handleChange} defaultValue="relevance">
        <option value="relevance">Relevance</option>
        <option value="company">Company Name (A-Z)</option>
        <option value="date">Date Posted (Newest)</option>
      </select>
    </div>
  );
};

export default SortDropdown;
