// components/CategoryFilter.js
import React from 'react';

const CategoryFilter = ({ setSelectedCategory }) => {
  return (
    <div className="category-list">
      <button onClick={() => setSelectedCategory("Spor")}>Spor</button>
      <button onClick={() => setSelectedCategory("Tiyatro")}>Tiyatro</button>
      <button onClick={() => setSelectedCategory("Konser")}>Konser</button>
      <button onClick={() => setSelectedCategory("")}>Tüm Etkinlikler</button>
    </div>
  );
};

export default CategoryFilter;
