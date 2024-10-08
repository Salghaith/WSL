import React, { useState } from 'react';
import './Sidebar.css';


const Sidebar = () => {
  const [checkedItems, setCheckedItems] = useState({
    suggested: Array(5).fill(false),
    distance: Array(5).fill(false),
    category1: Array(5).fill(false), // Replace with the actual category name
    category2: Array(5).fill(false), // Replace with the actual category name
  });

  const handleCheckboxChange = (category, index) => {
    const updatedItems = { ...checkedItems };
    updatedItems[category][index] = !updatedItems[category][index];
    setCheckedItems(updatedItems);
  };

  const clearAll = () => {
    setCheckedItems({
      suggested: Array(5).fill(false),
      distance: Array(5).fill(false),
      category1: Array(5).fill(false),
      category2: Array(5).fill(false),
    });
  };

  return (
    <div className="sidebar">
      <div className="filters-header">
        <h3>Filters</h3>
        <button className="clear-all" onClick={clearAll}>
          Clear All
        </button>
      </div>

      <div className="filter-category">
        <h4>Suggested</h4>
        {checkedItems.suggested.map((checked, index) => (
          <label key={index}>
            <input
              type="checkbox"
              checked={checked}
              onChange={() => handleCheckboxChange("suggested", index)}
            />
            Item {index + 1}
          </label>
        ))}
      </div>
      <hr />

      <div className="filter-category">
        <h4>Distance</h4>
        {checkedItems.distance.map((checked, index) => (
          <label key={index}>
            <input
              type="checkbox"
              checked={checked}
              onChange={() => handleCheckboxChange("distance", index)}
            />
            Item {index + 1}
          </label>
        ))}
      </div>
      <hr />

      <div className="filter-category">
        <h4>Category 1</h4>
        {checkedItems.category1.map((checked, index) => (
          <label key={index}>
            <input
              type="checkbox"
              checked={checked}
              onChange={() => handleCheckboxChange("category1", index)}
            />
            Item {index + 1}
          </label>
        ))}
      </div>
      <hr />

      <div className="filter-category">
        <h4>Category 2</h4>
        {checkedItems.category2.map((checked, index) => (
          <label key={index}>
            <input
              type="checkbox"
              checked={checked}
              onChange={() => handleCheckboxChange("category2", index)}
            />
            Item {index + 1}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
