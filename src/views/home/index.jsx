import { ArrowRightOutlined } from "@ant-design/icons";
import { MessageDisplay } from "@/components/common";
import { ProductShowcaseGrid } from "@/components/product";
import { Slider } from "@/components/common";

import {
  FEATURED_PRODUCTS,
  RECOMMENDED_PRODUCTS,
  KIDS_PRODUCTS,
  STICHED_PRODUCTS,
  SHOP,
} from "@/constants/routes";
import {
  useDocumentTitle,
  useFeaturedProducts,
  useRecommendedProducts,
  useKidsProducts,
  useStichedProducts,
  useScrollTop,
} from "@/hooks";
import React from "react";
import { Link } from "react-router-dom";
import { ImageWithText, BannerImage, ImageGallery } from "@/components/common";

import bannerImg from "@/images/banner-shop.jpg";
import bannerImg2 from "@/images/luxury_lawn.jpg";
import bannerImg3 from "@/images/lawn.jpg";
import bannerImg4 from "@/images/pret2.jpg";
import bg1 from "@/images/bannerimg1.png";
import bg2 from "@/images/bannerimg2.png";
import bg3 from "@/images/bannerimg3.jpg";

const Home = () => {
  useDocumentTitle("ALAYA ARTS | Feel The Stuff");
  useScrollTop();

  const {
    featuredProducts,
    fetchFeaturedProducts,
    isLoading: isLoadingFeatured,
    error: errorFeatured,
  } = useFeaturedProducts(4);
  const {
    recommendedProducts,
    fetchRecommendedProducts,
    isLoading: isLoadingRecommended,
    error: errorRecommended,
  } = useRecommendedProducts(6);
  const {
    kidsProducts,
    fetchKidsProducts,
    isLoading: isLoadingKids,
    error: errorKids,
  } = useKidsProducts(6);

  const {
    stichedProducts,
    fetchStichedProducts,
    isLoading: isLoadingStiched,
    error: errorStiched,
  } = useStichedProducts(6);
  return (
    <main className="content">
      <div className="home">
        <BannerImage backgroundImage={bg1} />
        {/* <BannerImage backgroundImage={bg2}  display_content="banner_display_none" /> */}
        <ImageGallery />

        {/* recommended products */}
        <div className="display">
          <div className="display-header">
            <h1>Recommended Products</h1>
            <Link to={RECOMMENDED_PRODUCTS}>See All</Link>
          </div>
          {errorRecommended && !isLoadingRecommended ? (
            <MessageDisplay
              message={errorRecommended}
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
        {/* image With Text */}

        <div className="banner mb-5">
          <div className="banner-desc">
            <h1 className="text-thin">
              <strong>Embrace</strong>
              &nbsp;elegance&nbsp;
              <strong>effortlessly</strong>
            </h1>
            <p>
              Unveil a world where shopping for clothes is not just a task, but a journey of self-expression. Whether it's the allure of a chic dress or the comfort of a cozy sweater, our collection is designed to elevate your wardrobe without breaking the bank. Discover your signature style and embrace every moment feeling fabulous.
            </p>
            <br />
            <Link to={SHOP} className="button">
              Explore Now &nbsp;
              <ArrowRightOutlined />
            </Link>
          </div>
          <div className="banner-img">
            <img src={bannerImg} alt="" />
          </div>
        </div>

        <BannerImage
          backgroundImage={bg2}
          display_content="banner_display_none"
        />
        {/* pret products */}
        <div className="display">
          <div className="display-header">
            <h1>Pret Products</h1>
            <Link to={STICHED_PRODUCTS}>See All</Link>
          </div>
          {errorStiched && !isLoadingStiched ? (
            <MessageDisplay
              message={errorStiched}
              action={fetchStichedProducts}
              buttonLabel="Try Again"
            />
          ) : (
            <ProductShowcaseGrid products={stichedProducts} skeletonCount={6} />
          )}
        </div>
        {/* 1 */}
        <div className="banner mb-5">
          <div className="banner-desc">
            <h1 className="text-thin">
              <strong>Sophisticated</strong>
              &nbsp;Style&nbsp;
              <strong>Redefined</strong>
            </h1>
            <p>
              Experience the joy of discovering clothes that perfectly complement your unique style. Our curated collection, featuring elegant dresses and snug sweaters, ensures there's something to elevate every wardrobe. Feel empowered, look exceptional, and enjoy the luxury of saving with every choice you make.
            </p>
            <br />
            <Link to={SHOP} className="button">
              Explore Now &nbsp;
              <ArrowRightOutlined />
            </Link>
          </div>
          <div className="banner-img">
            <img src={bannerImg3} alt="" />
          </div>
        </div>
        {/* 2 */}
        <div className="banner mb-5">
          <div className="banner-img">
            <img src={bannerImg2} alt="" />
          </div>

          <div className="banner-desc">
            <h1 className="text-thin">
              <strong>Affordable</strong>
              &nbsp;Elegance&nbsp;
              <strong></strong>
            </h1>
            <p>
              Discover stunning dresses and luxurious sweaters that redefine your style without breaking your budget.
            </p>
            <br />
            <Link to={SHOP} className="button">
              Explore Now &nbsp;
              <ArrowRightOutlined />
            </Link>
          </div>
        </div>
        {/* 3 */}
        <div className="banner mb-5">
          <div className="banner-desc">
            <h1 className="text-thin">
              <strong>Discover</strong>
              &nbsp;style with&nbsp;
              <strong>eligence</strong>
            </h1>
            <p>
              Shopping for clothes should make you feel great and look fabulous,
              all while saving you money. From chic dresses to cozy sweaters,
              our collection has something for every wardrobe.
            </p>
            <br />
            <Link to={SHOP} className="button">
              Explore Now &nbsp;
              <ArrowRightOutlined />
            </Link>
          </div>
          <div className="banner-img">
            <img src={bannerImg4} alt="" />
          </div>
        </div>
        {/* 3 end */}

        {/* <Slider /> */}
        {/* <BannerCarousel /> */}

        <div className="display">
          <div className="display-header">
            <h1>Featured Products</h1>
            <Link to={FEATURED_PRODUCTS}>See All</Link>
          </div>
          {errorFeatured && !isLoadingFeatured ? (
            <MessageDisplay
              message={errorFeatured}
              action={fetchFeaturedProducts}
              buttonLabel="Try Again"
            />
          ) : (
            <ProductShowcaseGrid
              products={featuredProducts}
              skeletonCount={4}
            />
          )}
        </div>

        <div className="display">
          <div className="display-header">
            <h1>KIDS Collections</h1>
            <Link to={KIDS_PRODUCTS}>See All</Link>
          </div>
          {errorKids && !isLoadingKids ? (
            <MessageDisplay
              message={errorKids}
              action={fetchKidsProducts}
              buttonLabel="Try Again"
            />
          ) : (
            <ProductShowcaseGrid products={kidsProducts} skeletonCount={6} />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
