import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { addQtyItem, minusQtyItem } from '@/redux/actions/basketActions';

const BasketItemControl = ({ product }) => {
  const dispatch = useDispatch();

  const onAddQty = () => {
    if (product.quantity < product.maxQuantity) {
      dispatch(addQtyItem(product.id));
    }
  };

  const onMinusQty = () => {
    if ((product.maxQuantity >= product.quantity) && product.quantity !== 0) {
      dispatch(minusQtyItem(product.id));
    }
  };

  return (
    <div className="basket-item-control">
      <button
        className="button button-border button-border-gray button-small basket-control basket-control-add"
        disabled={product.maxQuantity === product.quantity}
        onClick={onAddQty}
        type="button"
      >
        <PlusOutlined style={{ fontSize: '9px' }} />
      </button>
      <button
        className="button button-border button-border-gray button-small basket-control basket-control-minus"
        disabled={product.quantity === 1}
        onClick={onMinusQty}
        type="button"
      >
        <MinusOutlined style={{ fontSize: '9px' }} />
      </button>
    </div>
  );
};

BasketItemControl.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    brand: PropTypes.string,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    maxQuantity: PropTypes.number.isRequired,
    description: PropTypes.string,
    keywords: PropTypes.arrayOf(PropTypes.string),
    selectedSize: PropTypes.string,
    selectedColor: PropTypes.string,
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

export default BasketItemControl;
