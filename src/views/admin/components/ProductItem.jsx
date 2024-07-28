import { ImageLoader } from '@/components/common';
import { EDIT_PRODUCT } from '@/constants/routes';
import { displayActionMessage, displayDate, displayMoney } from '@/helpers/utils';
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useDispatch } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import { removeProduct } from '@/redux/actions/productActions';

const ProductItem = ({ product, searchTerm }) => {
  
  const dispatch = useDispatch();
  const history = useHistory();
  const productRef = useRef(null);

  const onClickEdit = () => {
    history.push(`${EDIT_PRODUCT}/${product.id}`);
  };

  const onDeleteProduct = () => {
    productRef.current.classList.toggle('item-active');
  };

  const onConfirmDelete = () => {
    dispatch(removeProduct(product.id));
    displayActionMessage('Item successfully deleted');
    productRef.current.classList.remove('item-active');
  };

  const onCancelDelete = () => {
    productRef.current.classList.remove('item-active');
  };

  const getCollection = () => {
    if (product.isStiched) return 'Stitched';
    if (product.isUnStiched) return 'UnStitched';
    if (product.isFeatured) return 'Featured';
    if (product.isKids) return 'Kids';
    if (product.isRecommended) return 'Recommended';
    if (product.isAccessories) return 'Accessories';
    return 'Not added';
  };

  
  const formattedDate = product.dateAdded ? displayDate(product.dateAdded) : '';

  // Function to check if a field matches the search term
  const matchesSearchTerm = (fieldValue) => {
    if (!searchTerm) return true; // If no search term, show all products

    const lowerCaseSearch = searchTerm.toLowerCase();
    return (
      fieldValue &&
      fieldValue.toString().toLowerCase().includes(lowerCaseSearch)
    );
  };

  // Ensure keywords is always an array
  const keywordsArray = Array.isArray(product.keywords) ? product.keywords : [];

  return (
    <SkeletonTheme color="#e1e1e1" highlightColor="#f2f2f2">
      <div className={`item item-products ${!product.id && 'item-loading'}`} ref={productRef}>
        <div className="grid grid-count-6">
          <div className="grid-col item-img-wrapper">
            {product.image ? (
              <ImageLoader alt={product.name} className="item-img" src={product.image} />
            ) : (
              <Skeleton width={50} height={30} />
            )}
          </div>
          <div className="grid-col">
            <span className="text-overflow-ellipsis">
              {matchesSearchTerm(product.name) ? product.name : <Skeleton width={50} />}
            </span>
          </div>
          <div className="grid-col">
            <span>
              {matchesSearchTerm(keywordsArray.join(', ')) ? keywordsArray.join(', ') || 'Not added' : <Skeleton width={50} />}
            </span>
          </div>
          <div className="grid-col">
            <span>
              {matchesSearchTerm(getCollection()) ? getCollection() : <Skeleton width={50} />}
            </span>
          </div>
          <div className="grid-col">
            <span>
              {matchesSearchTerm(product.price) ? product.price ? displayMoney(product.price) : '-' : <Skeleton width={30} />}
            </span>
          </div>
          <div className="grid-col">
            <span>
            {matchesSearchTerm(formattedDate) ? formattedDate || '-' : <Skeleton width={30} />}
            </span>
          </div>
          <div className="grid-col">
            <span>
              {matchesSearchTerm(product.maxQuantity) ? product.maxQuantity : <Skeleton width={20} />}
            </span>
          </div>
        </div>
        {product.id && (
          <div className="item-action">
            <button className="button button-border button-small" onClick={onClickEdit} type="button">
              Edit
            </button>
            &nbsp;
            <button className="button button-border button-small button-danger" onClick={onDeleteProduct} type="button">
              Delete
            </button>
            <div className="item-action-confirm">
              <h5>Are you sure you want to delete this?</h5>
              <button className="button button-small button-border" onClick={onCancelDelete} type="button">
                No
              </button>
              &nbsp;
              <button className="button button-small button-danger" onClick={onConfirmDelete} type="button">
                Yes
              </button>
            </div>
          </div>
        )}
      </div>
    </SkeletonTheme>
  );
};

ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    accessoryDetail: PropTypes.string,
    brand: PropTypes.string,
    price: PropTypes.number,
    maxQuantity: PropTypes.number,
    description: PropTypes.string,
    keywords: PropTypes.arrayOf(PropTypes.string),
    style: PropTypes.arrayOf(PropTypes.string),
    imageCollection: PropTypes.arrayOf(PropTypes.object),
    sizes: PropTypes.arrayOf(PropTypes.string),
    image: PropTypes.string,
    imageUrl: PropTypes.string,
    isFeatured: PropTypes.bool,
    isRecommended: PropTypes.bool,
    isAccessories: PropTypes.bool,
    isStiched: PropTypes.bool,
    isUnStiched: PropTypes.bool,
    isKids: PropTypes.bool,
    dateAdded: PropTypes.number,
    availableColors: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  searchTerm: PropTypes.string.isRequired, // Prop for search term
};

export default withRouter(ProductItem);
