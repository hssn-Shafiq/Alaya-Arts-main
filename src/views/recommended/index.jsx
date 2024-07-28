import React from 'react';
import { MessageDisplay, MultiCarousel } from '@/components/common';
import { ProductShowcaseGrid } from '@/components/product';
import { useDocumentTitle, useAccessoriesProducts, useScrollTop } from '@/hooks';
import bannerImg from '@/images/img1.jpg';
import ImageWithText from '@/components/common/ImageWithText'; // Correct import path

import BannerImage from '@/components/common/BannerImage'; // Correct import path for BannerImage
import { SHOP } from '@/constants/routes'; // Ensure SHOP is defined
import img1 from "@/images/accessories01.jpeg";
import img2 from "@/images/accessories02.jpg";
import img3 from "@/images/accessories03.jpg";
import img4 from "@/images/accessories04.jpeg";
import img5 from "@/images/accessories05.jpg";
import img6 from "@/images/accessories06.jpeg";
import bg6 from "@/images/bannerimg6.jpg";
import bg7 from "@/images/bannerimg7.jpg";


const RecommendedProducts = () => {
  useDocumentTitle('Recommended Products');
  useScrollTop();

  const images = [
    { src: img1, alt: 'The Best' },
    { src: img2, alt: 'Choose Best' },
    { src: img3, alt: 'According to Your taste' },
    { src: img4, alt: 'Discount' },
    { src: img5, alt: 'Demanding Sell Items' },
    { src: img6, alt: 'Choose Your Best Ideas' }
  ];

  const {
    accessoriesProducts,
    fetchAccessoriesProducts,
    isLoading,
    error
  } = useAccessoriesProducts();

  return (
    <>
      <MultiCarousel images={images} />


      <main className="content">
        <div className="featured">
          {/* <div className="banner">
            <div className="banner-desc">
              <h1>Recommended Products</h1>
            </div>
            <div className="banner-img">
              <img src={bg6} alt="" />
            </div>
          </div> */}
          <ImageWithText
            t1="Discover"
            t2="Our Exclusive"
            t3="Collection"
            desc="Explore a curated selection of high-quality products tailored just for you."
            link={SHOP}
            img={bg7}
            place={1} // Ensure this is a number
          />
          {/* imagewithtext 2nd */}
          <ImageWithText
            t1="Experience"
            t2="Luxury"
            t3="Redefined"
            desc="Discover Alaya Art's exceptional range of products, crafted to perfection for discerning tastes."
            link={SHOP}
            img={bg6}
            place={2} // Ensure this is a number
          />


          <div className="display">
            <h1 className='fw-bold' style={{padding:"0px 10px"}}>Accessories Products</h1>
            <div className="product-display-grid">
              {error && !isLoading ? (
                <MessageDisplay
                  message={error}
                  action={fetchAccessoriesProducts}
                  buttonLabel="Try Again"
                />
              ) : (
                <ProductShowcaseGrid
                  products={accessoriesProducts}
                  skeletonCount={6}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default RecommendedProducts;
