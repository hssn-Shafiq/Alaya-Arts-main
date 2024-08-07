import { ImageLoader } from "@/components/common";
import PropType from "prop-types";
import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useHistory } from "react-router-dom";
import { salesOff } from "@/helpers/utils";
const ProductFeatured = ({ product }) => {
  const history = useHistory();
  const onClickItem = () => {
    if (!product) return;

    history.push(`/product/${product.id}`);
  };

  return (
    <SkeletonTheme color="#e1e1e1" highlightColor="#f2f2f2">
      <div
        className="product-display"
        onClick={onClickItem}
        role="presentation"
      >
        {salesOff(product.comparePrice, product.price) ? (
          // <div className="sale_off">
          //   <span>- {salesOff(product.comparePrice, product.price)}%</span>
          // </div>
          <div className="sale_off">
            <span
              style={{ left: "auto", borderRadius: "0px 0px 25px 0px" }}
              className="p-3"
            >
              {salesOff(product.comparePrice, product.price)}%
            </span>
          </div>
        ) : (
          ""
        )}
        <div className="product-display-img">
          {product.image ? (
            <ImageLoader className="product-card-img" src={product.image} />
          ) : (
            <Skeleton width="100%" height="100%" />
          )}
        </div>
        <div className="product-display-details">
          <h2 className="product_name">{product.name || <Skeleton width={80} />}</h2>
          <p className="text-subtle text-italic">
            {product.brand || <Skeleton width={40} />}
          </p>
          <div className="d-flex justify-content-between">
            <p className=" text-danger fs-2 fw-bold product_price">
             Rs. {product.price || <Skeleton width={40} />} <sup>
              <strike className="fw-regular">
                {product.comparePrice
                  ? product.comparePrice
                  : "  " || <Skeleton width={40} />}
              </strike>
                </sup> 
            </p>
            <p className="text-subtle text-italic product_sale_off">
              {salesOff(product.comparePrice, product.price)}
            </p>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
};

ProductFeatured.propTypes = {
  product: PropType.shape({
    image: PropType.string,
    name: PropType.string,
    id: PropType.string,
    brand: PropType.string,
  }).isRequired,
};

export default ProductFeatured;
