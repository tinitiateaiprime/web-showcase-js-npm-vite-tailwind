import React from "react";
const Filter = ({ categories, selectedCategory, setSelectedCategory }) => (
  <select
    value={selectedCategory}
    onChange={(e) => setSelectedCategory(e.target.value)}
    className="w-full p-2 border rounded-md"
  >
    <option value="">All Categories</option>
    {categories.map((category) => (
      <option key={category} value={category}>{category}</option>
    ))}
  </select>
);
export default Filter;