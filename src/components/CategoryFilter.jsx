import React from 'react';

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  if (!categories || categories.length === 0) return null;

  return (
    <div className="category-filter">
      <label htmlFor="category-select">Filter by Category:</label>
      <select 
        id="category-select"
        value={selectedCategory} 
        onChange={(e) => onCategoryChange(e.target.value)}
        aria-label="Filter products by category"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category.charAt(0).toUpperCase() + category.slice(1)} 
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;