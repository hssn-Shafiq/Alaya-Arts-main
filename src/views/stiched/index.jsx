import { MessageDisplay, BannerImage } from '@/components/common';
import { ProductShowcaseGrid } from '@/components/product';
import { useDocumentTitle, useStichedProducts, useScrollTop } from '@/hooks';
import React from 'react';
import bannerImg from "@/images/bannerimg2.png"
const StichedProducts = () => {
  useDocumentTitle('Stiched Products | Alaya Arts');
  useScrollTop();

  const {
    stichedProducts,
    fetchStichedProducts,
    isLoading,
    error
  } = useStichedProducts();

  return (
    <>
      <BannerImage backgroundImage={bannerImg} display_content="banner_display_none" />
    <main className="content">
      <div className="featured">
        <div className="display">
          <div className="product-display-grid">
            {(error && !isLoading) ? (
              <MessageDisplay
                message={error}
                action={fetchStichedProducts}
                buttonLabel="Try Again"
              />
            ) : (
              <ProductShowcaseGrid
                products={stichedProducts}
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

export default StichedProducts;
