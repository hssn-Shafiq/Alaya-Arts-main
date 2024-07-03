/* eslint-disable react/jsx-props-no-spreading */
import { Boundary } from '@/components/common';
import { AppliedFilters, ProductList } from '@/components/product';
import { useDocumentTitle, useScrollTop } from '@/hooks';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { selectFilter } from '@/selectors/selector';
import { ProductsNavbar } from '../components';
import ProductsTable from '../components/ProductsTable';

const Products = () => {
  useDocumentTitle('Product List | Alaya Arts Admin');
  useScrollTop();

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const store = useSelector((state) => ({
    filteredProducts: selectFilter(state.products.items, state.filter),
    requestStatus: state.app.requestStatus,
    isLoading: state.app.loading,
    products: state.products
  }));

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset current page when search term changes
  };

  // Filter products based on search term
  const filteredProducts = store.filteredProducts.filter((product) => {
    return (
      (product.name?.toLowerCase().includes(searchTerm.toLowerCase()) || // Check for name
      (product.isStiched && 'Stiched'.toLowerCase().includes(searchTerm.toLowerCase())) || // Check for stitched
      (product.isFeatured && 'Featured'.toLowerCase().includes(searchTerm.toLowerCase())) || // Check for featured
      (product.isKids && 'Kids'.toLowerCase().includes(searchTerm.toLowerCase())) || // Check for kids
      (product.isRecommended && 'Recommended'.toLowerCase().includes(searchTerm.toLowerCase())) || // Check for recommended
      (product.price && product.price.toString().includes(searchTerm)) || // Check for price
      (product.dateAdded && product.dateAdded.toString().includes(searchTerm)) || // Check for dateAdded
      (product.maxQuantity && product.maxQuantity.toString().includes(searchTerm)) // Check for maxQuantity
    ));
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Boundary>
      <ProductsNavbar
        productsCount={store.products.items.length}
        totalProductsCount={store.products.total}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />
      <div className="product-admin-items">
        <ProductList {...store}>
          <AppliedFilters filter={store.filter} />
          <ProductsTable filteredProducts={currentProducts} />
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            paginate={paginate}
            handlePreviousPage={handlePreviousPage}
            handleNextPage={handleNextPage}
          />
        </ProductList>
      </div>
    </Boundary>
  );
};

const Pagination = ({ totalPages, currentPage, paginate, handlePreviousPage, handleNextPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        <li>
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="page-link"
            style={{
              background: "gray",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontWeight: "600",
              padding: "5px 10px",
              margin: "5px"
            }}
          >
            Previous
          </button>
        </li>
        <li>
          <p style={{ margin: "0 10px" }}>
            Page {currentPage} of {totalPages}
          </p>
        </li>
        <li>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="page-link"
            style={{
              background: "blue",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontWeight: "600",
              padding: "5px 10px",
              margin: "5px"
            }}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default withRouter(Products);
