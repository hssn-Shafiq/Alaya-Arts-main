// src/components/KidsProducts.js
import React, { useState, useEffect } from 'react';
import { MessageDisplay, MultiCarousel, ImageWithText } from '@/components/common';
import { ProductShowcaseGrid } from '@/components/product';
import { useDocumentTitle, useKidsProducts, useScrollTop } from '@/hooks';
import firebaseInstance from '@/services/firebase';

import unstitchimg2 from '@/images/Unstitch Img2.jpg';
import ActiveFilters from '@/components/common/ActiveFilters';
import FilterCollection from '@/components/common/FilterCollection';

const KidsProducts = () => {
  useDocumentTitle('Kids Collection | Alaya Arts');
  useScrollTop();

  const [carouselImages, setCarouselImages] = useState([]);
  const [filters, setFilters] = useState({
    priceFrom: '',
    priceTo: '',
    keyword: '',
    size: ''
  });

  useEffect(() => {
    const fetchCarouselImages = async () => {
      const images = await firebaseInstance.getCollectionImages('Kids Collection');
      setCarouselImages(images.map((url, index) => ({ src: url, alt: `Kids Collection ${index + 1}` })));
    };

    fetchCarouselImages();
  }, []);

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

  console.log('KidsProducts Component Mounted');
  console.log('Carousel Images:', carouselImages);
  console.log('Filtered Products:', filteredProducts);

  return (
    <>
      <main className="content">
        <MultiCarousel images={carouselImages} />
        <div className="featured">
          <div className="display">
            <h1 className='px-3'>Kids Collection</h1>
            <div className="container">
              <FilterCollection
                filters={filters}
                handleFilterChange={handleFilterChange}
                removeFilter={removeFilter}
              />
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
                      action={fetchKidsProducts}
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
