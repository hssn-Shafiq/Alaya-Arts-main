import { MessageDisplay } from '@/components/common';
import { ProductShowcaseGrid } from '@/components/product';
import { useDocumentTitle, useStichedProducts, useScrollTop } from '@/hooks';
import bannerImg from '@/images/banner-guy.png';
import React from 'react';

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
    <main className="content">
      <div className="featured">
        <div className="banner">
          <div className="banner-desc">
            <h1>Stiched Products</h1>
          </div>
          <div className="banner-img">
            <img src={bannerImg} alt="" />
          </div>
        </div>
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
  );
};

export default StichedProducts;
