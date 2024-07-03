import React from 'react';
import { FilterOutlined, PlusOutlined } from '@ant-design/icons';
import { FiltersToggle } from '@/components/common';
import { ADD_PRODUCT } from '@/constants/routes';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const ProductsNavbar = ({ productsCount, totalProductsCount, searchTerm, onSearchChange }) => {
  const history = useHistory();

  return (
    <div className="product-admin-header">
      <h3 className="product-admin-header-title">
        Products &nbsp;
        ({`${productsCount} / ${totalProductsCount}`})
      </h3>
      <input
        type="text"
        className="search-input"
        placeholder="Search by Name, Style, Collection, Price, Date Added, Quantity..."
        value={searchTerm}
        onChange={onSearchChange}
      />
      &nbsp;
      <FiltersToggle>
        <button className="button-muted button-small" type="button">
          <FilterOutlined />
          &nbsp;More Filters
        </button>
      </FiltersToggle>
      <button
        className="button button-small"
        onClick={() => history.push(ADD_PRODUCT)}
        type="button"
      >
        <PlusOutlined />
        &nbsp; Add New Product
      </button>
    </div>
  );
};

ProductsNavbar.propTypes = {
  productsCount: PropTypes.number.isRequired,
  totalProductsCount: PropTypes.number.isRequired,
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

export default ProductsNavbar;
