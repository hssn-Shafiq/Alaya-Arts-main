// src/components/WinterUnStichedProducts.js
import React, { useState, useEffect } from 'react';
import { MessageDisplay } from '@/components/common';
import { ProductShowcaseGrid } from '@/components/product';
import { useDocumentTitle, useWinterUnStichedProducts, useScrollTop } from '@/hooks';
import ImageWithText from '@/components/common/ImageWithText';
import BannerImage from '@/components/common/BannerImage';
import { SHOP } from '@/constants/routes';
import bg5 from "@/images/bannerimg5.png";
import bg6 from "@/images/bannerimg6.jpg";
import bg7 from "@/images/bannerimg7.jpg";
import ActiveFilters from '@/components/common/ActiveFilters';
import FilterCollection from '@/components/common/FilterCollection';
import firebaseInstance from '@/services/firebase';

const WinterUnStichedProducts = () => {  
  useDocumentTitle('Winter UnStiched Collection - Alaya Arts');
  useScrollTop();
 
  const [homeImage, setHomeImage] = useState("");
  useEffect(() => {
    // Fetch existing images on component mount
    const fetchBannerImages = async () => {
      try {
        const data = await firebaseInstance.getBannerImages();
        setHomeImage(data.unstichedWinterImageUrl)
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
    winterUnStichedProducts,
    fetchWinterUnStichedProducts,
    isLoading,
    error
  } = useWinterUnStichedProducts();

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

  const filteredProducts = winterUnStichedProducts.filter(product => {
    const matchesPrice = (filters.priceFrom === '' || product.price >= Number(filters.priceFrom)) &&
    (filters.priceTo === '' || product.price <= Number(filters.priceTo));
  const matchesKeyword = filters.keyword === '' || (product.keywords && product.keywords.includes(filters.keyword));

  return matchesPrice && matchesKeyword;
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
            <h1 className='px-3'>Winter UnStiched Collection</h1>
            <div className="container">
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
                    action={fetchWinterUnStichedProducts}
                    buttonLabel="Try Again"
                  />
                ) : (
                  filteredProducts.length === 0 ? (
                    <MessageDisplay
                      message="No products found for the selected filters."
                      action={fetchWinterUnStichedProducts}
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

export default WinterUnStichedProducts;
