// src/components/RecommendedProducts.js
import React, { useState } from 'react';
import { MessageDisplay } from '@/components/common';
import { ProductShowcaseGrid } from '@/components/product';
import { useDocumentTitle, useRecommendedProducts, useScrollTop } from '@/hooks';
import ImageWithText from '@/components/common/ImageWithText';
import BannerImage from '@/components/common/BannerImage';
import { SHOP } from '@/constants/routes';
import bg5 from "@/images/bannerimg5.png";
import bg6 from "@/images/bannerimg6.jpg";
import bg7 from "@/images/bannerimg7.jpg";
import ActiveFilters from '@/components/common/ActiveFilters'; 

const RecommendedProducts = () => {
  useDocumentTitle('Recommended Products');
  useScrollTop();

  const [filters, setFilters] = useState({
    priceFrom: '',
    priceTo: '',
    keyword: '',
    size: ''
  });

  const {
    recommendedProducts,
    fetchRecommendedProducts,
    isLoading,
    error
  } = useRecommendedProducts();

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

  const filteredProducts = recommendedProducts.filter(product => {
    const matchesPrice = (filters.priceFrom === '' || product.price >= Number(filters.priceFrom)) &&
                         (filters.priceTo === '' || product.price <= Number(filters.priceTo));
    const matchesKeyword = filters.keyword === '' || product.keywords.includes(filters.keyword);
    const matchesSize = filters.size === '' || product.sizes.includes(filters.size);

    return matchesPrice && matchesKeyword && matchesSize;
  });

  return (
    <>
      <BannerImage backgroundImage={bg5} />

      <main className="content">
        <div className="featured">
          <ImageWithText
            t1="Discover"
            t2="Our Exclusive"
            t3="Collection"
            desc="Explore a curated selection of high-quality products tailored just for you."
            link={SHOP}
            img={bg7}
            place={1}
          />
          <ImageWithText
            t1="Experience"
            t2="Luxury"
            t3="Redefined"
            desc="Discover Alaya Art's exceptional range of products, crafted to perfection for discerning tastes."
            link={SHOP}
            img={bg6}
            place={2}
          />
          <div className="display">
            <h1 className='px-3'>Pret Collection</h1>
            <div className="container">
              <div className="filter row w-100 my-5">
                <div className='price col-md-6 col-md-12 col-sm-10 d-flex' style={{marginTop:"15px"}}>
                  <label>Price:</label>
                  <input
                    type="number"
                    name="priceFrom"
                    value={filters.priceFrom}
                    onChange={handleFilterChange}
                    placeholder="Min Price"
                  />
                  <input
                    type="number"
                    name="priceTo"
                    value={filters.priceTo}
                    onChange={handleFilterChange}
                    placeholder="Max Price"
                  />
                </div>
                <div className="col-md-6 col-md-12 d-flex justify-content-end gap-5" style={{marginTop:"15px"}}>
                  <div className='size'>
                    <label className='py-3'>Size:</label>
                    <select className='py-3' name="size" value={filters.size} onChange={handleFilterChange}>
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
                    <label className='py-3'>Keyword:</label>
                    <select className='py-3' name="keyword" value={filters.keyword} onChange={handleFilterChange}>
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
                    action={fetchRecommendedProducts}
                    buttonLabel="Try Again"
                  />
                ) : (
                  filteredProducts.length === 0 ? (
                    <MessageDisplay
                      message="No products found for the selected filters."
                        action={fetchRecommendedProducts}
                    buttonLabel="Apply other filter"
                    />
                  ) : (
                    <ProductShowcaseGrid
                      products={filteredProducts}
                      skeletonCount={5}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default RecommendedProducts;
