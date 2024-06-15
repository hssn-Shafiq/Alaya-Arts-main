import React from "react";


const OrderDetailsModal = ({ order, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Order Details</h2>
          <span className="close" onClick={onClose}>&times;</span>
        </div>
        <div className="modal-body">
          <h3>Products</h3>
          {order.products.map((product) => (
            <div className="product-details" key={product.name}>
              <img src={product.imageUrl} alt={product.name} width={50} />
              <span>{product.name} (Qty: {product.quantity})</span>
            </div>
          ))}
          <h3>Customer Details</h3>
          <p><strong>Name:</strong> {order.shippingDetails?.fullname}</p>
          <p><strong>Address:</strong> {order.shippingDetails?.address}</p>
          <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
          <p><strong>Total:</strong> {order.total}</p>
        </div>
        <div className="modal-footer">
          <button onClick={() => console.log("Edit Order")}>Edit</button>
          <button onClick={() => console.log("Cancel Order")}>Cancel</button>
          <button onClick={() => console.log("Complete Order")}>Complete</button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
