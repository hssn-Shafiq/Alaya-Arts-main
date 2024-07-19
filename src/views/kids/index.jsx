import React from 'react';
import { MessageDisplay, MultiCarousel, ImageWithText } from '@/components/common';
import { ProductShowcaseGrid } from '@/components/product';
import { useDocumentTitle, useUnstichedProducts, useScrollTop } from '@/hooks';
import unstitchimg2 from '@/images/Unstitch Img2.jpg';
import kids01 from '@/images/Kids01.png';
import kids02 from '@/images/Kids02.png';
import kids03 from '@/images/Kids03.png';
import kids04 from '@/images/Kids04.png';
import kids05 from '@/images/Kids05.png';
import kids06 from '@/images/Kids06.png';


const UnstichedProducts = () => {
  useDocumentTitle('UnStiched Products | Alaya Arts');
  useScrollTop();

  const images = [
    { src: kids01, alt: 'The Best' },
    { src: kids02, alt: 'Choose Best' },
    { src: kids03, alt: 'According to Your taste' },
    { src: kids04, alt: 'Discount' },
    { src: kids05, alt: 'Demanding Sell Items' },
    { src: kids06, alt: 'Choose Your Best Ideas' }
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
