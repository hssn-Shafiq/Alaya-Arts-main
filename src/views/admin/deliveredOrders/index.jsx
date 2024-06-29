import React,{useState} from 'react';
import { useHistory } from 'react-router-dom';
import useAdminOrders from '@/hooks/useAdminOrders';
import firebaseInstance from '@/services/firebase';
import * as ROUTES from '@/constants/routes';
import { FiltersToggle, SearchBar } from '@/components/common';
import { displayActionMessage } from '@/helpers/utils';
const DeliveredOrders = () => {
  const { deliveredOrders, isLoading, error, deletedOrders } = useAdminOrders();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  if (error) {
    return <div>Error: {error}</div>;
  }
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = deliveredOrders.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(deliveredOrders.length / itemsPerPage);

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
  const handleDeleteOrder = async (orderId) => {
      try {
        await firebaseInstance.deleteDeliveredOrders(orderId);
        displayActionMessage("order deleted successfully");
      } catch (err) {
        console.error(err);
        displayActionMessage("Failed to delete order");
      }
  };

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
            </tr>
          </thead>
          <tbody>
          {currentOrders.length === 0 ? (
  <tr>
    <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
    {isLoading ? <div class="order_loader"></div> :  "No orders found"}
    </td>
  </tr>
) : (
  currentOrders.map((order) => (
    <tr key={order.id}>
      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
      <td>{order.shippingDetails?.fullname}</td>
      <td>{order.shippingDetails?.address}</td>
      <td>{order.total}</td>
      <td className="d-flex" style={{ alignItems: 'center', gap: '10px' }}>
        {order.products.map((product, index) => (
          <div key={`${order.id}-${index}`} className="d-flex" style={{ marginBottom: '10px', alignItems: 'center', gap: '10px' }}>
            <img
              src={product.imageUrl}
              alt={product.name}
              width={30}
              style={{ marginRight: '10px' }}
            />
          </div>
        ))}
      </td>
      <td>
        <button
          style={{
            background: "green",
            color: "rgba(255, 255, 255, 0.47)",
            border: "none",
            borderRadius: "4px",
            fontWeight: "600",
            padding: "5px"
          }}
          disabled
        >
          {order.orderStatus}
        </button>
        <button
          style={{
            background: "red",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontWeight: "600",
            padding: "5px"
          }}
          onClick={() => handleDeleteOrder(order.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ))
)}

          </tbody>
        </table>
        <div className="pagination">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
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
          <span style={{ margin: "0 10px" }}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
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
        </div>
      </div>
    </>
  );

}

export default DeliveredOrders;