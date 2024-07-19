/* eslint-disable react/jsx-props-no-spreading */
import { AppliedFilters, ProductGrid, ProductList } from '@/components/product';
import { useDocumentTitle, useScrollTop } from '@/hooks';
import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { selectFilter } from '@/selectors/selector';
import { BannerCarousel, BannerImage } from '@/components/common';
import bg2 from "@/images/bannerimg2.png";
import bg3 from "@/images/bannerimg3.jpg";


const Shop = () => {
  useDocumentTitle('Shop | Salinaka');
  useScrollTop();

  const store = useSelector((state) => ({
    filteredProducts: selectFilter(state.products.items, state.filter),
    products: state.products,
    requestStatus: state.app.requestStatus,
    isLoading: state.app.loading
  }), shallowEqual);

  return (
    <>
   
    {/* <BannerImage /> */}
     <BannerImage backgroundImage= {bg3}  position="center"  />
    <main className="content mb-5">
      <section className="product-list-wrapper" style={{marginTop:"10rem"}}>
        <AppliedFilters filteredProductsCount={store.filteredProducts.length} />
        <ProductList {...store}>
          <ProductGrid products={store.filteredProducts} />
        </ProductList>
      </section>
    </main>
    </>
    
  );
};

export default Shop;
