// src/components/UnstichedProducts.js
import React, { useState } from 'react';
import { MessageDisplay, MultiCarousel, ImageWithText, Footer } from '@/components/common';
import { ProductShowcaseGrid } from '@/components/product';
import { useDocumentTitle, useUnstichedProducts, useScrollTop } from '@/hooks';
import unstitchimg2 from '@/images/Unstitch Img2.jpg';
import img1 from '@/images/image1.jpg';
import img2 from '@/images/image2.jpg';
import img3 from '@/images/image3.jpg';
import img4 from '@/images/image4.jpg';
import img5 from '@/images/Unstitch Img.jpg';
import ActiveFilters from '@/components/common/ActiveFilters'; // Import the ActiveFilters component

const UnstichedProducts = () => {
  useDocumentTitle('UnStiched Products | Alaya Arts');
  useScrollTop();

  const images = [
    { src: img1, alt: 'The Best' },
    { src: img2, alt: 'Choose Best' },
    { src: img3, alt: 'According to Your taste' },
    { src: img4, alt: 'Discount' },
    { src: img1, alt: 'Demanding Sell Items' },
    { src: img3, alt: 'Choose Your Best Ideas' }
  ];

  const [filters, setFilters] = useState({
    priceFrom: '',
    priceTo: '',
    keyword: '',
    size: ''
  });

  const {
    unstichedProducts,
    fetchUnstichedProducts,
    isLoading,
    error
  } = useUnstichedProducts();

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

  const filteredProducts = unstichedProducts.filter(product => {
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
                    action={fetchUnstichedProducts}
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

export default UnstichedProducts;
