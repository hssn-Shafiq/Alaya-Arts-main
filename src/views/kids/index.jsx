import { MessageDisplay } from '@/components/common';
import { ProductShowcaseGrid } from '@/components/product';
import { useDocumentTitle, useKidsProducts, useScrollTop } from '@/hooks';
import banImg from "@/images/bannerimg1.png"
import { BannerImage } from '@/components/common';
import React from 'react';

const KidsProducts = () => {
  useDocumentTitle('Kids Products | Salinaka');
  useScrollTop();

  const {
    kidsProducts,
    fetchKidsProducts,
    isLoading,
    error
  } = useKidsProducts();

  return (
    <>
    <BannerImage backgroundImage={banImg} display_content="banner_display_none"/>
    <main className="content">
      <div className="featured">
        <div className="display">
          <div className="product-display-grid">
            {(error && !isLoading) ? (
              <MessageDisplay
                message={error}
                action={fetchKidsProducts}
                buttonLabel="Try Again"
              />
            ) : (
              <ProductShowcaseGrid
                products={kidsProducts}
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

export default KidsProducts;
