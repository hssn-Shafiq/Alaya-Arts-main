import React, { useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import useUserOrders from '@/hooks/useUserOrders';
// import './AllOrders.css'; // Import the CSS file

const AllOrders = () => {
  const { orders, isLoading, error } = useUserOrders();
  const [hiddenOrders, setHiddenOrders] = useState([]);

  const hideOrder = (orderId) => {
    setHiddenOrders([...hiddenOrders, orderId]);
  };

  if (isLoading) {
    return <div>Loading orders...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className='container'>
        <h2 className="text-center">My Orders</h2>
        <div className="orders">
          {orders.map((order) =>
            hiddenOrders.includes(order.id) ? null : (
              <div className="order" key={order.id}>
                <div className="order-info" data-spm-anchor-id="a2a0e.order_list.0.i3.a65d7d689cl5JA">
                  <div className="pull-left">
                    <div className="info-order-left-text">
                      Order <a className="link">#{order.id}</a>
                    </div>
                    <p className="text info desc">Placed on {order.createdAt}</p>
                  </div>
                  <div className="clear" />
                  <p className='text info desc'>Will be delivered between 4 to 5 working days</p>
                  <div className="pull-right">
                    <CloseOutlined className="cursor-pointer" onClick={() => hideOrder(order.id)} />
                  </div>
                </div>
                <div className="order-items">
                  {order.products.map((product, index) => (
                    <div className="order-item" key={index}>
                      <div className="item-pic" data-spm="detail_image">
                        <img src={product.imageUrl} alt={product.name} />
                      </div>
                      <div className="item-main item-main-mini">
                        <div>
                          <div className="text title item-title" data-spm="details_title">
                            {product.name}
                          </div>
                          <p className="text desc" />
                          <p className="shipping_detail">{product.description}</p>
                          <p>Size: {product.size}m</p>
                          <p className='d-flex'>
                            Color: 
                            <span 
                              className="color-circle"
                              style={{ '--color': product.color }}
                            ></span> 
                          </p>    
                        </div>
                      </div>
                      <div className="item-quantity">
                        <span>
                          <span className="text desc info multiply">Qty:</span>
                          <span className="text">&nbsp;{product.quantity}</span>
                        </span>
                      </div>
                      <div className="item-status item-capsule">
                        <p className="capsule">{order.orderStatus}</p>
                        <p className="capsule">Price: {product.price}</p>
                      </div>
                      <div className="item-info" />
                      <div className="clear" />
                      <div className="details"></div>
                    </div>
                  ))}
                </div>
                <div className="order-info" data-spm-anchor-id="a2a0e.order_list.0.i3.a65d7d689cl5JA">
                  <div className="pull-left">
                    <div className="info-order-left-text">
                      Contact: +<a className="link">{order.shippingDetails.mobile.value}</a>
                    </div>
                    <p className="text info desc">Shipped to: {order.shippingDetails.address}</p>
                  </div>
                  <div className="clear" />
                  <div className="pull-right">
                    Total amount: {order.total}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default AllOrders;
