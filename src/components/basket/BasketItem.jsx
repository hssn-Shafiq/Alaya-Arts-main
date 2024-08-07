import { CloseOutlined } from '@ant-design/icons';
import BasketItemControl from '@/components/basket/BasketItemControl';
import { ImageLoader } from '@/components/common';
import { displayMoney } from '@/helpers/utils';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromBasket } from '@/redux/actions/basketActions';

const BasketItem = ({ product }) => {
  const dispatch = useDispatch();
  const onRemoveFromBasket = () => dispatch(removeFromBasket(product.id));

  return (
    <div className="basket-item">
      <BasketItemControl product={product} />
      <div className="basket-item-wrapper">
        <div className="basket-item-img-wrapper">
          <ImageLoader
            alt={product.name}
            className="basket-item-img"
            src={product.image}
          />
        </div>
        <div className="basket-item-details">
          <Link to={`/product/${product.id}`} onClick={() => document.body.classList.remove('is-basket-open')}>
            <h4 className="underline basket-item-name">
              {product.name}
            </h4>
          </Link>
         
          <div className="basket-item-specs">
            <div>
              <span className="spec-title fs-4 mb-0">Quantity</span>
              <h5 className="my-0  text-start">{product.quantity}</h5>
            </div>
            <div>
              <span className="spec-title fs-4 mb-0">{product.selectedSize ? "Size" : "Accessory Type"}</span>
              <h5 className="my-0">
                {product.selectedSize ? product.selectedSize : product.accessoryDetail}
                {' '}
              </h5>
            </div>
          </div>
        </div>
        <div className="basket-item-price">
          <h4 className="my-0">{displayMoney(product.price * product.quantity)}</h4>
        </div>
        <button 
          className="basket-item-remove button button-border button-border-gray button-small"
          onClick={onRemoveFromBasket}
          type="button"
        >
          <CloseOutlined />
        </button>
      </div>
    </div>
  );
};

BasketItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    brand: PropTypes.string,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    description: PropTypes.string,
    keywords: PropTypes.arrayOf(PropTypes.string),
    selectedSize: PropTypes.string,
    imageCollection: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired
      })
    ).isRequired,
    sizes: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
    image: PropTypes.string,
    imageUrl: PropTypes.string,
    isFeatured: PropTypes.bool,
    isRecommended: PropTypes.bool,
    availableColors: PropTypes.arrayOf(PropTypes.string)
  }).isRequired
};

export default BasketItem;
