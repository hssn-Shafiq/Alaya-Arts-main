// src/components/UnstichedProducts.js
import React, { useState, useEffect } from 'react';
import { MessageDisplay, MultiCarousel, ImageWithText, Footer } from '@/components/common';
import { ProductShowcaseGrid } from '@/components/product';
import { useDocumentTitle, useUnstichedProducts, useScrollTop } from '@/hooks';
import firebaseInstance from '@/services/firebase';
import unstitchimg2 from '@/images/Unstitch Img2.jpg';
import ActiveFilters from '@/components/common/ActiveFilters';
import FilterCollection from '@/components/common/FilterCollection';

const UnstichedProducts = () => {
  useDocumentTitle('UnStiched Collection | Alaya Arts');
  useScrollTop();

  const [carouselImages, setCarouselImages] = useState([]);
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

  useEffect(() => {
    const fetchCarouselImages = async () => {
      const images = await firebaseInstance.getCollectionImages('UnStiched Collection');
      setCarouselImages(images.map(url => ({ src: url, alt: 'UnStiched Collection Image' })));
    };

    fetchCarouselImages();
  }, []);

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

    return matchesPrice && matchesKeyword;
  });

  return (
    <>
      <main className="content">

        <MultiCarousel images={carouselImages} />
      </main>

        <div className="featured mt-5">
          <div className="display">
            <h1 className='px-3'>Unstiched Collection</h1>
            <div className="container-">
              <FilterCollection
                filters={filters}
                handleFilterChange={handleFilterChange}
                removeFilter={removeFilter}
                showSizeDiv="d-none"
              />
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
                      action={fetchUnstichedProducts}
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
    </>
  );
};

export default UnstichedProducts;
