/* eslint-disable react/jsx-props-no-spreading */
import { AppliedFilters, ProductGrid, ProductList } from '@/components/product';
import { useDocumentTitle, useScrollTop } from '@/hooks';
import React, { useState, useEffect } from 'react';
import firebaseInstance from '@/services/firebase';
import { shallowEqual, useSelector } from 'react-redux';
import { selectFilter } from '@/selectors/selector';
import { BannerCarousel, BannerImage } from '@/components/common';
import bg2 from "@/images/bannerimg2.png";
import bg3 from "@/images/bannerimg3.jpg";


const Shop = () => {
  useDocumentTitle('Shop All Collection | Alaya Arts');
  useScrollTop();
  const [shopImage, setShopImage] = useState("");

  useEffect(() => {

    const fetchBannerImages = async () => {
      try {
        const data = await firebaseInstance.getBannerImages();
        setShopImage(data.shopImageUrl)
      } catch (error) {
        console.error("Error fetching existing images:", error);
      }
    };

    fetchBannerImages();

  }, [])

  const store = useSelector((state) => ({
    filteredProducts: selectFilter(state.products.items, state.filter),
    products: state.products,
    requestStatus: state.app.requestStatus,
    isLoading: state.app.loading
  }), shallowEqual);

  return (
    <>
      <main className="content mb-5">
        <BannerImage backgroundImage={shopImage ? shopImage : bg3} position="center" />
      </main>
       <section className="product-list-wrapper" style={{ marginTop: "2rem" }}>
          <AppliedFilters filteredProductsCount={store.filteredProducts.length} />
          <ProductList {...store}>
            <ProductGrid products={store.filteredProducts} />
          </ProductList>
        </section>
    </>

  );
};

export default Shop;
