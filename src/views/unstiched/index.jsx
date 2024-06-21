import { MessageDisplay } from '@/components/common';
import { ProductShowcaseGrid } from '@/components/product';
import { useDocumentTitle, useUnstichedProducts, useScrollTop } from '@/hooks';
import bannerImg from '@/images/bannerimg2.png';
import { BannerImage } from '@/components/common';
import React from 'react';

const UnstichedProducts = () => {
  useDocumentTitle('UnStiched Products | Alaya Arts');
  useScrollTop();

  const {
    unstichedProducts,
    fetchUnstichedProducts,
    isLoading,
    error
  } = useUnstichedProducts();

  return (

   <>
   <BannerImage backgroundImage={bannerImg}  />
    <main className="content">
      <div className="featured">
        <div className="display">
          <div className="product-display-grid">
            {(error && !isLoading) ? (
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
      </div>
    </main>
   </>
  );
};

export default UnstichedProducts;
