import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="search-bar">
      <label htmlFor="search-input">Search Products:</label>
      <input
        id="search-input"
        type="text"
        placeholder="Search by title or description..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label="Search products"
      />
    </div>
  );
};

export default SearchBar;