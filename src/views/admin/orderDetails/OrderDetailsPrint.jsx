import React from 'react';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeliveredProcedureOutlined,
  HomeOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";
import logo from '@/images/alaya-arts-removebg.png';

const OrderDetailsPrint = React.forwardRef((props, ref) => {
  const { order, id } = props;

  return (
    <div className='invoice-container' ref={ref} style={{ padding: "4rem" }}>
      <div className='invoice-header'>
        <div className='logo text-center'>
          <h1>Alaya Arts</h1>
        </div>
        <div className='invoice-info'>
          <h2>Invoice</h2>
          <p>Order ID: <span>{id}</span></p>
          <p>Date: <span>{new Date().toLocaleDateString()}</span></p>
        </div>
      </div>

      <div className='invoice-body'>
        <div className='customer-info'>
          <h3>Recipient:</h3>
          <p>{order.shippingDetails.fullname}</p>
          <p>{order.shippingDetails.address}</p>
          <p>{order.shippingDetails.email}</p>
          <p>{order.shippingDetails.mobile.value}</p>
        </div>

        <div className='product-table'>
          <h2 className='text-center'>Product Details</h2>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Size</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {order.products.map((product, index) => (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td>{product.quantity}/p</td>
                  <td>{product.size}</td>
                  <td>PKR: {product.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className='total-cost'>
          <h3>Total Cost: <span>{order.total}</span></h3>
        </div>
      </div>
      <div className='invoice-footer'>
        <p>Thank you for your trust on us!</p>
      </div>
    </div>
  );
});

export default OrderDetailsPrint;