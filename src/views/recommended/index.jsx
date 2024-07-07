import React from 'react';
import { MessageDisplay, MultiCarousel } from '@/components/common';
import { ProductShowcaseGrid } from '@/components/product';
import { useDocumentTitle, useRecommendedProducts, useScrollTop } from '@/hooks';
import bannerImg from '@/images/img1.jpg';
import ImageWithText from '@/components/common/ImageWithText'; // Correct import path

import BannerImage from '@/components/common/BannerImage'; // Correct import path for BannerImage
import { SHOP } from '@/constants/routes'; // Ensure SHOP is defined
import bg1 from "@/images/bannerimg1.png";
import bg2 from "@/images/bannerimg2.png";
import bg3 from "@/images/bannerimg3.jpg";
import bg4 from "@/images/bannerimg4.png";
import bg5 from "@/images/bannerimg5.png";
import bg6 from "@/images/bannerimg6.jpg";
import bg7 from "@/images/bannerimg7.jpg";


const RecommendedProducts = () => {
  useDocumentTitle('Recommended Products');
  useScrollTop();

  const images = [
    { src: bg1, alt: 'The Best' },
    { src: bg2, alt: 'Choose Best' },
    { src: bg3, alt: 'According to Your taste' },
    { src: bg4, alt: 'Discount' },
    { src: bg5, alt: 'Demanding Sell Items' },
    { src: bg6, alt: 'Choose Your Best Ideas' }
  ];

  const {
    recommendedProducts,
    fetchRecommendedProducts,
    isLoading,
    error
  } = useRecommendedProducts();

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
            <h1>Recommended Products</h1>
            <div className="product-display-grid">
              {error && !isLoading ? (
                <MessageDisplay
                  message={error}
                  action={fetchRecommendedProducts}
                  buttonLabel="Try Again"
                />
              ) : (
                <ProductShowcaseGrid
                  products={recommendedProducts}
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
