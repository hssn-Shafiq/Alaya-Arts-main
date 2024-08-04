import { CheckOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { ImageLoader } from "@/components/common";
import { displayMoney, salesOff } from "@/helpers/utils";
import PropType from "prop-types";
import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useHistory } from "react-router-dom";

const ProductItem = ({ product, isItemOnBasket, addToBasket }) => {
  const history = useHistory();

  const onClickItem = () => {
    if (!product) return;

    if (product.id) {
      history.push(`/product/${product.id}`);
    }
  };

  const itemOnBasket = isItemOnBasket ? isItemOnBasket(product.id) : false;

  const handleAddToBasket = () => {
    if (addToBasket)
      addToBasket({ ...product, selectedSize: product.sizes[0] });
  };

  return (
    <SkeletonTheme color="#e1e1e1" highlightColor="#f2f2f2">
      <div
        className={`product-card ${!product.id ? "product-loading" : ""}`}
        style={{
          border: product && itemOnBasket ? "1px solid #a6a5a5" : "",
          boxShadow:
            product && itemOnBasket ? "0 10px 15px rgba(0, 0, 0, .07)" : "none",
        }}
      >
        {itemOnBasket && (
          <CheckOutlined className="fa fa-check product-card-check" />
        )}
        <div
          className="product-card-content"
          onClick={onClickItem}
          role="presentation"
        >
          {salesOff(product.comparePrice, product.price) ? (
            <div className="sale_off" >
              <span style={{right:"0"}}>{salesOff(product.comparePrice, product.price)}</span>
            </div>
          ) : (
            ""
          )}

          <div className="product-card-img-wrapper">
            {product.image ? (
              <ImageLoader
                alt={product.name}
                className="product-card-img"
                src={product.image}
              />
            ) : (
              <Skeleton width="100%" height="90%" />
            )}
          </div>
          <div className="product-details">
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
        {product.id && (
          <button
            className={`product-card-button d-flex button-small button button-block ${
              itemOnBasket ? "button-border button-border-gray" : ""
            }`}
            onClick={handleAddToBasket}
            type="button"
          >
            <ShoppingCartOutlined style={{ marginRight: "5px" }} />{" "}
            {itemOnBasket ? "Remove from basket" : "Add to basket"}
          </button>
        )}
      </div>
    </SkeletonTheme>
  );
};

ProductItem.defaultProps = {
  isItemOnBasket: undefined,
  addToBasket: undefined,
};

ProductItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  product: PropType.object.isRequired,
  isItemOnBasket: PropType.func,
  addToBasket: PropType.func,
};

export default ProductItem;
