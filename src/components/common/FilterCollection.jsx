import React, { useState, useEffect } from 'react';
import firebaseInstance from '@/services/firebase';
// import './style.scss'; // Ensure this imports your CSS file

const FilterCollection = ({ filters, handleFilterChange, removeFilter, showSizeDiv }) => {
  const [sizes, setSizes] = useState([]);
  const [keywords, setKeywords] = useState([]);

  useEffect(() => {
    const fetchUniqueFilters = async () => {
      try {
        const uniqueSizes = await firebaseInstance.getUniqueSizes();
        const uniqueKeywords = await firebaseInstance.getUniqueKeywords();
        setSizes(uniqueSizes);
        setKeywords(uniqueKeywords);
      } catch (error) {
        console.error("Error fetching unique filters: ", error);
      }
    };

    fetchUniqueFilters();
  }, []);

  if (!sizes.length && !keywords.length) {
    return <div>Loading filters...</div>; // Handle loading state
  }

  return (
    <div className="filter row w-100 my-3">
      <div className='price col-md-6  d-flex flex-column flex-md-row align-items-md-center' style={{ marginTop: "15px" }}>
        <label className="filter-label mb-2 mb-md-0 me-md-2">Price:</label>
        <input
          type="number"
          name="priceFrom"
          value={filters.priceFrom || ''}
          onChange={handleFilterChange}
          placeholder="Min Price"
          className="form-control filter-input mb-2 mb-md-0"
        />
        <input
          type="number"
          name="priceTo"
          value={filters.priceTo || ''}
          onChange={handleFilterChange}
          placeholder="Max Price"
          className="form-control filter-input"
        />
      </div>
      <div className="col-md-6  d-flex  flex-md-row justify-content-between justify-content-md-end gap-3 mt-3 mt-md-0">
        <div className={`size ${showSizeDiv} `}>
          <label className='filter-label py-2 py-md-0 me-md-2'>Size:</label>
          <select className='form-select' name="size" value={filters.size || ''} onChange={handleFilterChange}>
            <option value="">All</option>
            {sizes.map(size => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div className='keyword'>
          <label className='filter-label py-2 py-md-0 me-md-2'>Keyword:</label>
          <select className='form-select' name="keyword" value={filters.keyword || ''} onChange={handleFilterChange}>
            <option value="">All</option>
            {keywords.map(keyword => (
              <option key={keyword} value={keyword}>
                {keyword}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterCollection;
