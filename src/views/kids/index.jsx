// src/components/KidsProducts.js
import React, { useState } from 'react';
import { MessageDisplay, MultiCarousel, ImageWithText } from '@/components/common';
import { ProductShowcaseGrid } from '@/components/product';
import { useDocumentTitle, useKidsProducts, useScrollTop } from '@/hooks';
import unstitchimg2 from '@/images/Unstitch Img2.jpg';
import kids01 from '@/images/Kids01.png';
import kids02 from '@/images/Kids02.png';
import kids03 from '@/images/Kids03.png';
import kids04 from '@/images/Kids04.png';
import kids05 from '@/images/Kids05.png';
import kids06 from '@/images/Kids06.png';
import ActiveFilters from '@/components/common/ActiveFilters'; // Import the ActiveFilters component

const KidsProducts = () => {
  useDocumentTitle('Kids Products | Alaya Arts');
  useScrollTop();

  const images = [
    { src: kids01, alt: 'The Best' },
    { src: kids02, alt: 'Choose Best' },
    { src: kids03, alt: 'According to Your taste' },
    { src: kids04, alt: 'Discount' },
    { src: kids05, alt: 'Demanding Sell Items' },
    { src: kids06, alt: 'Choose Your Best Ideas' }
  ];

  const [filters, setFilters] = useState({
    priceFrom: '',
    priceTo: '',
    keyword: '',
    size: ''
  });

  const {
    kidsProducts,
    fetchKidsProducts,
    isLoading,
    error
  } = useKidsProducts();

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const removeFilter = (filter) => {
    setFilters({
      ...filters,
      [filter]: ''
    });
  };

  const filteredProducts = kidsProducts.filter(product => {
    const matchesPrice = (filters.priceFrom === '' || product.price >= Number(filters.priceFrom)) &&
                         (filters.priceTo === '' || product.price <= Number(filters.priceTo));
    const matchesKeyword = filters.keyword === '' || (product.keywords && product.keywords.includes(filters.keyword));
    const matchesSize = filters.size === '' || (product.sizes && product.sizes.includes(filters.size));

    return matchesPrice && matchesKeyword && matchesSize;
  });

  return (
    <>
      <MultiCarousel images={images} />
      <main className="content">
        <div className="featured">
          <div className="display">
            <h1 className='fw-bold fs-1'>Products:</h1>
            <div className="container">
              <div className="filter row w-100 my-5">
                <div className='price col-md-6 d-flex'>
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
                <div className="col-md-6 d-flex justify-content-end gap-5">
                  <div className='size'>
                    <label className='py-3'>Size:</label>
                    <select className='py-3' name="size" value={filters.size || ''} onChange={handleFilterChange}>
                      <option value="">All</option>
                      <option value="stitched">Stitched</option>
                      <option value="unstitched">Unstitched</option>
                      <option value="sm">Small</option>
                      <option value="md">Medium</option>
                      <option value="lg">Large</option>
                      <option value="xl">XL</option>
                      <option value="1xl">1XL</option>
                      <option value="2xl">2XL</option>
                    </select>
                  </div>
                  <div className='keyword'>
                    <label className='py-3'>Style:</label>
                    <select className='py-3' name="keyword" value={filters.keyword || ''} onChange={handleFilterChange}>
                      <option value="">All</option>
                      <option value="lawn">Lawn</option>
                      <option value="kids">Kids</option>
                      <option value="bottle">Bottle</option>
                    </select>
                  </div>
                </div>
              </div>
              <ActiveFilters filters={filters} removeFilter={removeFilter} />
              <div className="product-display-grid">
                {error && !isLoading ? (
                  <MessageDisplay
                    message={error}
                    action={fetchKidsProducts}
                    buttonLabel="Try Again"
                  />
                ) : (
                  filteredProducts.length === 0 ? (
                    <MessageDisplay
                      message="No products found for the selected filters."
                    />
                  ) : (
                    <ProductShowcaseGrid
                      products={filteredProducts}
                      skeletonCount={6}
                    />
                  )
                )}
              </div>
            </div>
          </div>
          <ImageWithText
            t1="Discover"
            t2="Our Exclusive"
            t3="Collection"
            desc="Explore a curated selection of high-quality products tailored just for you."
            link="SHOP"
            img={unstitchimg2}
            place={1}
          />
        </div>
      </main>
    </>
  );
};

export default KidsProducts;
