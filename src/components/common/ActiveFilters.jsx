// src/components/ActiveFilters.js
import React from 'react';

const ActiveFilters = ({ filters, removeFilter }) => {
  const activeFilters = Object.keys(filters).filter(key => filters[key] !== '');

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div className="active-filters">
      {activeFilters.map(filter => (
        <div key={filter} className="active-filter">
          <span>{`${filter}: ${filters[filter]}`}</span>
          <button onClick={() => removeFilter(filter)}>x</button>
        </div>
      ))}
    </div>
  );
};

export default ActiveFilters;
