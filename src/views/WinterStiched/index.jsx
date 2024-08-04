// src/components/WinterStichedProducts.js
import React, { useState, useEffect } from 'react';
import { MessageDisplay } from '@/components/common';
import { ProductShowcaseGrid } from '@/components/product';
import { useDocumentTitle, useWinterStichedProducts, useScrollTop } from '@/hooks';
import ImageWithText from '@/components/common/ImageWithText';
import BannerImage from '@/components/common/BannerImage';
import { SHOP } from '@/constants/routes';
import bg5 from "@/images/bannerimg5.png";
import bg6 from "@/images/bannerimg6.jpg";
import bg7 from "@/images/bannerimg7.jpg";
import ActiveFilters from '@/components/common/ActiveFilters';
import FilterCollection from '@/components/common/FilterCollection';
import firebaseInstance from '@/services/firebase';

const WinterStichedProducts = () => {
  const [homeImage, setHomeImage] = useState("");      
  useDocumentTitle('Winter Pret Collection - Alaya Arts');
  useScrollTop();

  useEffect(() => {
    // Fetch existing images on component mount
    const fetchBannerImages = async () => {
      try {
        const data = await firebaseInstance.getBannerImages();
        setHomeImage(data.pretWinterImageUrl)
      } catch (error) {
        console.error("Error fetching existing images:", error);
      }
    };

    fetchBannerImages();
  }, []);

  const [filters, setFilters] = useState({
    priceFrom: '',
    priceTo: '',
    keyword: '',
    size: ''
  });

  const {
    winterStichedProducts,
    fetchWinterStichedProducts,
    isLoading,
    error
  } = useWinterStichedProducts();

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

  const filteredProducts = winterStichedProducts.filter(product => {
    const matchesPrice = (filters.priceFrom === '' || product.price >= Number(filters.priceFrom)) &&
      (filters.priceTo === '' || product.price <= Number(filters.priceTo));
    const matchesKeyword = filters.keyword === '' || product.keywords.includes(filters.keyword);
    const matchesSize = filters.size === '' || product.sizes.includes(filters.size);

    return matchesPrice && matchesKeyword && matchesSize;
  });

  return (
    <>
      <main className="content">
        <BannerImage backgroundImage={homeImage ? homeImage : bg5} />
      </main>
      
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
            <h1 className='px-3'>Winter Pret Collection</h1>
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
                    action={fetchWinterStichedProducts}
                    buttonLabel="Try Again"
                  />
                ) : (
                  filteredProducts.length === 0 ? (
                    <MessageDisplay
                      message="No products found for the selected filters."
                      action={fetchWinterStichedProducts}
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
    </>
  );
};

export default WinterStichedProducts;
