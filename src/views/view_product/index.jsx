import { ArrowLeftOutlined, LoadingOutlined } from '@ant-design/icons';
import { ColorChooser, ImageLoader, MessageDisplay } from '@/components/common';
import { ProductShowcaseGrid } from '@/components/product';
import { STICHED_PRODUCTS, SHOP } from '@/constants/routes';
import { displayMoney, salesOff } from '@/helpers/utils';
import {
  useBasket,
  useDocumentTitle,
  useProduct,
  useStichedProducts,
  useScrollTop
} from '@/hooks';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Select from 'react-select';

const ViewProduct = () => {
  const { id } = useParams();
  const { product, isLoading, error } = useProduct(id);
  const { addToBasket, isItemOnBasket } = useBasket(id);
  useScrollTop();
  useDocumentTitle(`View ${product?.name || 'Item'}`);

  const [selectedImage, setSelectedImage] = useState(product?.image || '');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [message, setMessage] = useState("");
  const {
    stichedProducts,
    fetchStichedProducts,
    isLoading: isLoadingFeatured,
    error: errorFeatured
  } = useStichedProducts(6);
  const colorOverlay = useRef(null);

  useEffect(() => {
    setSelectedImage(product?.image);
  }, [product]);

  const onSelectedSizeChange = (newValue) => {
    setSelectedSize(newValue.value);
  };

  const onSelectedColorChange = (color) => {
    setSelectedColor(color);
    if (colorOverlay.current) {
      colorOverlay.current.value = color;
    }
  };

  const handleAddToBasket = () => {
    if(product.isAccessories === true){
      addToBasket({ ...product, selectedColor, selectedSize: selectedSize || "" });
    }
    else if(!selectedSize){
      setMessage("please select a size first");
    }
    else{
      setMessage("");
      addToBasket({ ...product, selectedColor, selectedSize: selectedSize || product.sizes[0] });
    }
  };

  return (
    <main className="content">
      {isLoading && (
        <div className="loader">
          <h4>Loading Product...</h4>
          <br />
          <LoadingOutlined style={{ fontSize: '3rem' }} />
        </div>
      )}
      {error && (
        <MessageDisplay message={error} />
      )}
      {(product && !isLoading) && (
        <div className="product-view">
          <Link to={SHOP}>
            <h3 className="button-link d-inline-flex">
              <ArrowLeftOutlined />
              &nbsp; Back to shop
            </h3>
          </Link>
          <div className="product-modal">
            {product.imageCollection.length !== 0 && (
              <div className="product-modal-image-collection">
                {product.imageCollection.map((image) => (
                  <div
                    className="product-modal-image-collection-wrapper"
                    key={image.id}
                    onClick={() => setSelectedImage(image.url)}
                    role="presentation"
                  >
                    <ImageLoader
                      className="product-modal-image-collection-img"
                      src={image.url}
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="product-modal-image-wrapper">
              {selectedColor && <input type="color" disabled ref={colorOverlay} id="color-overlay" />}
              <ImageLoader
                alt={product.name}
                className="product-modal-image"
                src={selectedImage}
              />
            </div>
            <div className="product-modal-details">
              <br />
              {/* <span className="text-subtle">{product.brand}</span> */}
              <span className="text-subtle fw-bold">{product.keywords[0]}</span>
              <h1 className="margin-top-0 fw-bolder ">{product.name}</h1>
              <span>{product.description}</span>

              <div className="divider" />
              <br />
              {product.sizes.length > 0 ? (
                    <div>
                    <span className="text-subtle fw-bold">Select size <span className='text-danger'>*</span></span>
                    <Select
                      placeholder="--Select Size --"
                      className="mt-2"
                      onChange={onSelectedSizeChange ? onSelectedSizeChange : null}
                      options={product.sizes.sort((a, b) => (a < b ? -1 : 1)).map((size) => ({ label: `${size}`, value: size }))}
                      styles={{ menu: (provided) => ({ ...provided, zIndex: 10 }) }}
                    />
                  </div>
                ) : (
                  <div>
                 <h4>Accessory Type <span>{product.accessoryDetail}</span></h4>
                </div>
                )}
                <div className="mt-md-5"></div>
                <span className='discount_percentage alert alert-info fw-bold p-2 rounded-2'>
                {salesOff(product.comparePrice, product.price)}</span>
              <div className="price d-flex mt-3">
              <h1>{displayMoney(product.price)}</h1>
              <h3 className='compare_price'><strike>{product.comparePrice ? `PKR: ${product.comparePrice }`: null}</strike></h3>
              </div>
              {message && <div className='discount_percentage alert alert-danger alert-dismissible fade show fw-bold p-2 rounded-2'>
                      {message}
                      </div>
                      
                      }
              <div className="product-modal-action">
                <button
                  className={`button button-small ${isItemOnBasket(product.id) ? 'button-border button-border-gray' : ''}`}
                  onClick={handleAddToBasket}
                  type="button"
                >
                 <i class="fa-solid fa-cart-shopping me-2"></i> {isItemOnBasket(product.id) ? 'Remove From Basket' : 'Add To Basket'}
                </button>
              </div>
            </div>
          </div>
          <div style={{ marginTop: '10rem' }}>
            <div className="display-header">
              <h1>Recommended</h1>
              <Link to={STICHED_PRODUCTS}>See All</Link>
            </div>
            {errorFeatured && !isLoadingFeatured ? (
              <MessageDisplay
                message={error}
                action={fetchStichedProducts}
                buttonLabel="Try Again"
              />
            ) : (
              <ProductShowcaseGrid products={stichedProducts} skeletonCount={3} />
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default ViewProduct;
