import React from 'react';
import { MessageDisplay, MultiCarousel, ImageWithText, Footer } from '@/components/common';
import { ProductShowcaseGrid } from '@/components/product';
import { useDocumentTitle, useUnstichedProducts, useScrollTop } from '@/hooks';
import unstitchimg2 from '@/images/Unstitch Img2.jpg';
import img1 from '@/images/image1.jpg';
import img2 from '@/images/image2.jpg';
import img3 from '@/images/image3.jpg';
import img4 from '@/images/image4.jpg';
import img5 from '@/images/Unstitch Img.jpg';

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

  const {
    unstichedProducts,
    fetchUnstichedProducts,
    isLoading,
    error
  } = useUnstichedProducts();

  return (
    <>
      <MultiCarousel images={images} />
      <main className="content">
        <div className="featured">
          <div className="display">
            <h1 className='fw-bold fs-1'>Products:</h1>
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
          {/* Image with text */}
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
