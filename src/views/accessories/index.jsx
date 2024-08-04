import React, { useState, useEffect } from 'react';
import { MessageDisplay, MultiCarousel } from '@/components/common';
import { ProductShowcaseGrid } from '@/components/product';
import { useDocumentTitle, useAccessoriesProducts, useScrollTop } from '@/hooks';
import bannerImg from '@/images/img1.jpg';
import ImageWithText from '@/components/common/ImageWithText';
import BannerImage from '@/components/common/BannerImage';
import { SHOP } from '@/constants/routes';
import bg6 from "@/images/bannerimg6.jpg";
import bg7 from "@/images/bannerimg7.jpg";
import firebaseInstance from '@/services/firebase';
import ActiveFilters from '@/components/common/ActiveFilters';

const AccessoriesProducts = () => {
  useDocumentTitle('Accessories Collection - Alaya Arts');
  useScrollTop();

  const [carouselImages, setCarouselImages] = useState([]);
  const [accessoryTypes, setAccessoryTypes] = useState([]);
  const [filters, setFilters] = useState({
    priceFrom: '',
    priceTo: '',
    accessoryDetail: ''
  });

  useEffect(() => {
    const fetchCarouselImages = async () => {
      const images = await firebaseInstance.getCollectionImages('Accessories Collection');
      setCarouselImages(images.map((url, index) => ({ src: url, alt: `Accessories Collection ${index + 1}` })));
    };

    const fetchAccessoryDetails = async () => {
      try {
        const productsWithAccessories = await firebaseInstance.getProductsWithAccessoryDetails();
        setAccessoryTypes(productsWithAccessories);
        console.log("Products with accessory details: ", productsWithAccessories);
      } catch (error) {
        console.error("Error fetching products with accessory details: ", error);
      }
    };

    fetchCarouselImages();
    fetchAccessoryDetails();
  }, []);

  const {
    accessoriesProducts,
    fetchAccessoriesProducts,
    isLoading,
    error
  } = useAccessoriesProducts();

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

  const filteredProducts = accessoriesProducts.filter(product => {
    const matchesPrice = (filters.priceFrom === '' || product.price >= Number(filters.priceFrom)) &&
      (filters.priceTo === '' || product.price <= Number(filters.priceTo));
    const matchesAccessoryDetail = filters.accessoryDetail === '' || (product.accessoryDetail && product.accessoryDetail === filters.accessoryDetail);

    return matchesPrice && matchesAccessoryDetail;
  });

  return (
    <>
      <main className="content">
        <MultiCarousel images={carouselImages} />
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
            <h1 className='px-3'>Accessories Collection</h1>
            <div className="container">
              <div className="filter row w-100 my-5">
                <div className='price col-md-6 col-sm-10 d-flex' style={{ marginTop: "15px" }}>
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
                <div className="col-md-6 d-flex justify-content-end gap-5" style={{ marginTop: "15px" }}>
                  <div className='accessory-detail'>
                    <label className='py-3'>Accessory Type:</label>
                    <select
                      className='py-3'
                      name="accessoryDetail"
                      value={filters.accessoryDetail}
                      onChange={handleFilterChange}
                    >
                      <option value="">All</option>
                      {accessoryTypes.map(type => (
                        <option key={type.id} value={type.accessoryDetail}>
                          {type.accessoryDetail}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <ActiveFilters filters={filters} removeFilter={removeFilter} />
              <div className="product-display-grid">
                {error && !isLoading ? (
                  <MessageDisplay
                    message={error}
                    action={fetchAccessoriesProducts}
                    buttonLabel="Try Again"
                  />
                ) : (
                  filteredProducts.length === 0 ? (
                    <MessageDisplay
                      message="No products found for the selected filters."
                      action={fetchAccessoriesProducts}
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

export default AccessoriesProducts;
