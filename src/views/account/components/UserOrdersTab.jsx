import React, { useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import useUserOrders from '@/hooks/useUserOrders';

const UserOrdersTab = () => {
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
      <div>
        <h2 className="text-center">My Orders</h2>
        <div className="orders">
          {orders.map((order) =>
            hiddenOrders.includes(order.id) ? null : (
              <div className="order" key={order.id}>
                <div
                  className="order-info d-flex align-items-center"
                  style={{ justifyContent: "space-between" }}
                  data-spm-anchor-id="a2a0e.order_list.0.i3.a65d7d689cl5JA"
                >
                  <div className="pull-left">
                    <div className="info-order-left-text">
                      Order <a className="link">#{order.id}</a>
                    </div>
                    <p className="text info desc">Placed on {order.createdAt}</p>
                  </div>
                  <div className="clear" />
                  <p className='text info desc'>will be dilivered between 4 to 5 working day</p>
                  <div className="pull-right">
                    <CloseOutlined
                      style={{ cursor: 'pointer' }}
                      onClick={() => hideOrder(order.id)}
                    />
                  </div>
                </div>
                <div className="order-items">
                  {order.products.map((product, index) => (
                    <>
                     <div className="order-item" key={index}>
                      <div className="item-pic" data-spm="detail_image">
                        <img src={product.imageUrl} alt={product.name} width={100} />
                      </div>
                      <div className="item-main item-main-mini">
                        <div>
                          <div className="text title item-title" data-spm="details_title">
                            {product.name}
                          </div>
                          <p className="text desc" />
                          <p className="shipping_detail">{product.description}</p>
                          <p >size: {product.size}m</p>
                          <p className='d-flex'>
                          color: <span 
                          style={{
                            backgroundColor: product.color,
                            width: '15px',
                            height: '15px',
                            borderRadius: '50%',
                            marginLeft:'5px'
                          }}
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
                        <p className="capsule">price: {product.price}</p>
                      </div>
                      <div className="item-info" />
                      <div className="clear" />
                      <div className="details">
                      </div>
                    </div>
                   <br />

                    </>
                  ))}
                </div>
                <div
                  className="order-info d-flex align-items-center"
                  style={{ justifyContent: "space-between" }}
                  data-spm-anchor-id="a2a0e.order_list.0.i3.a65d7d689cl5JA"
                >
                  <div className="pull-left">
                    <div className="info-order-left-text">
                      contact: +<a className="link">{order.shippingDetails.mobile.value}</a>
                    </div>
                    <p className="text info desc">Sipped to: {order.shippingDetails.address}</p>
                  </div>
                  <div className="clear" />
                  <div className="pull-right">
                   total amount: {order.total}
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

export default UserOrdersTab;
