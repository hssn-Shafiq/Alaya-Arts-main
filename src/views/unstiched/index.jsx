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
            <h1 className='fw-bold fs-1' style={{padding:"0px 10px"}}>Products:</h1>
            <div className="product-display-grid">
              {error && !isLoading ? (
                <MessageDisplay
                  message={error}
                  action={fetchUnstichedProducts}
                  buttonLabel="Try Again"
                />
              ) : (
                <ProductShowcaseGrid
                  products={unstichedProducts}
                  skeletonCount={6}
                />
              )}
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
