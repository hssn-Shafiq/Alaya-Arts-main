import React, { useState, useEffect } from 'react';
import firebaseInstance from '@/services/firebase';

const FilterCollection = ({ filters, handleFilterChange, removeFilter, showSizeDiv }) => {
  const [sizes, setSizes] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [showSize, setShowSize] = useState(''); // Or any other logic for showSize

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
    <div className="filter row w-100 my-5">
      <div className='price col-md-6 col-sm-10 d-flex' style={{ marginTop: "15px" }}>
        <label>Price:</label>
        <input
          type="number"
          name="priceFrom"
          value={filters.priceFrom || ''}
          onChange={handleFilterChange}
          placeholder="Min Price"
        />
        <input
          type="number"
          name="priceTo"
          value={filters.priceTo || ''}
          onChange={handleFilterChange}
          placeholder="Max Price"
        />
      </div>
      <div className="col-md-6 d-flex justify-content-end gap-5" style={{ marginTop: "15px" }}>
        <div className={`size ${showSizeDiv}`}>
          <label className='py-3'>Size:</label>
          <select className='py-3' name="size" value={filters.size || ''} onChange={handleFilterChange}>
            <option value="">All</option>
            {sizes.map(size => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div className='keyword'>
          <label className='py-3'>Keyword:</label>
          <select className='py-3' name="keyword" value={filters.keyword || ''} onChange={handleFilterChange}>
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
