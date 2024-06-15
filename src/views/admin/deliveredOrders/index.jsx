import React from 'react';
import { useHistory } from 'react-router-dom';
import useAdminOrders from '@/hooks/useAdminOrders';
import firebaseInstance from '@/services/firebase';
import * as ROUTES from '@/constants/routes';

const DeliveredOrders = () => {
  const { deliveredOrders, isLoading, error } = useAdminOrders();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
    <div className="loader">
    <h2>All Delivered Orders</h2>
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
              {/* <th>Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {deliveredOrders.map((order) => (
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
                <button onClick={() => handleUpdateStatus(order.id, 'processing')} style={{background:"green", color:"rgba(255, 255, 255, 0.47)",border:"none", borderRadius:"4px",fontWeight:"600", padding:"5px"}} disabled>{order.orderStatus || 'Processing'}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  )

}

export default DeliveredOrders;