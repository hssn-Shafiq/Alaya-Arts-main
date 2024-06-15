import React from 'react';
import { useHistory } from 'react-router-dom';
import useAdminOrders from '@/hooks/useAdminOrders';
import firebaseInstance from '@/services/firebase';
import * as ROUTES from '@/constants/routes';
import { EyeFilled } from '@ant-design/icons';

const Orders = () => {
  const { orders, isLoading, error } = useAdminOrders();
  const history = useHistory();

  const handleViewDetails = (orderId) => {
    history.push(`${ROUTES.ORDER_DETAILS.replace(':id', orderId)}`);
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await firebaseInstance.updateOrderStatus(orderId, newStatus);
      alert('Order status updated successfully');
      // Optionally, refresh orders or update state to reflect changes
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status');
    }
  };

  if (isLoading) {
    return <div>Loading orders...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!orders || orders.length === 0) {
    return <div>No orders found.</div>;
  }

  return (
    <>
      <div className="loader">
        <h2>My Orders</h2>
      </div>
      <div className="all_orders">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Customer</th>
              <th>Shipping Address</th>
              <th>Total Price</th>
              <th>Products</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>{order.shippingDetails?.fullname}</td>
                <td>{order.shippingDetails?.address}</td>
                <td>{order.total}</td>
                <td className="d-flex" style={{ alignItems: 'center', gap: '10px' }}>
                  {order.products.map((product, index) => (
                    <div key={`${order.id}-${index}`} className="d-flex" style={{ marginBottom: '10px', alignItems: 'center', gap: '10px'                    }}>
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      width={30}
                      style={{ marginRight: '10px' }}
                    />
                    {/* <div>{product.name}</div>
                    <div>Qty: {product.quantity}</div> */}
                  </div>
                ))}
              </td>
              <td>
                <button onClick={() => handleUpdateStatus(order.id, 'processing')}>{order.orderStatus || 'Processing'}</button>
              </td>
              <td>
                <button onClick={() => handleViewDetails(order.id)}><EyeFilled /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
);
};

export default Orders;

