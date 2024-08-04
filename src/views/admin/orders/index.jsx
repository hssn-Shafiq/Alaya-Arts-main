import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import useAdminOrders from "@/hooks/useAdminOrders";
import firebaseInstance from "@/services/firebase";
import * as ROUTES from "@/constants/routes";
import { EyeFilled } from "@ant-design/icons";

const Orders = () => {
  const { orders, isLoading, error } = useAdminOrders();
  const history = useHistory();

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleViewDetails = (orderId) => {
    history.push(`${ROUTES.ORDER_DETAILS.replace(":id", orderId)}`);
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await firebaseInstance.updateOrderStatus(orderId, newStatus);
      alert("Order status updated successfully");
      // Optionally, refresh orders or update state to reflect changes
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status");
    }
  };

  const getStatusButtonColor = (status) => {
    switch (status) {
      case "confirmed":
        return "green";
      case "out for delivery":
        return "blue";
      case "Processing":
        return "orangered";
      default:
        return "grey";
    }
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const filteredOrders = orders.filter((order) => {
    const orderDate = new Date(order.createdAt).toISOString().split("T")[0];
    return (
      (selectedDate === "" || orderDate === selectedDate) &&
      (selectedStatus === "" || order.orderStatus === selectedStatus)
    );
  });

  const sortOrders = (orders) => {
    return orders.sort((a, b) => {
      const statusPriority = {
        "Processing": 1,
        "confirmed": 2,
        "out for delivery": 3,
      };

      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);

      if (statusPriority[a.orderStatus] !== statusPriority[b.orderStatus]) {
        return statusPriority[a.orderStatus] - statusPriority[b.orderStatus];
      } else {
        return dateB - dateA;
      }
    });
  };

  const sortedOrders = sortOrders(filteredOrders);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="loader">
        {/* <h1 className=' order_page_title'>My Orders</h1> */}
      </div>
      <div className="filters row align-items-center my-4">
        <div className="col-md-6">
          <h2 className="mb-0">Filter By</h2>
        </div>
        <div className="col-md-6 d-flex flex-wrap justify-content-between">
          <div className="by_date">
            <label htmlFor="Date" className="bg-transparent border-0">By Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              placeholder="Filter by date"
            />
          </div>
          <div className="by_status">
            <label htmlFor="" className="bg-transparent border-0">By Status</label>
            <select value={selectedStatus} onChange={handleStatusChange}>
              <option value="">All Statuses</option>
              <option value="confirmed">confirmed</option>
              <option value="out for delivery">out for delivery</option>
              <option value="Processing">Pending</option>
            </select>
          </div>
        </div>
      </div>
      <div className="all_orders">
        <table>
          <thead>
            <tr className="text-center">
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
            {sortedOrders.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  style={{ textAlign: "center", padding: "20px" }}
                >
                  {isLoading ? (
                    <div className="order_loader"></div>
                  ) : (
                    "Sorry no new order found keep patience.!😢"
                  )}
                </td>
              </tr>
            ) : (
              sortedOrders.map((order) => (
                <tr key={order.id}>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>{order.shippingDetails?.fullname}</td>
                  <td>{order.shippingDetails?.address}</td>
                  <td>{Math.round(order.total)}</td>
                  <td
                    className="d-flex"
                    style={{ alignItems: "center", gap: "10px" }}
                  >
                    {order.products.map((product, index) => (
                      <div
                        key={`${order.id}-${index}`}
                        className="d-flex"
                        style={{
                          marginBottom: "10px",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          width={30}
                          style={{ marginRight: "10px" }}
                        />
                      </div>
                    ))}
                  </td>
                  <td>
                    <button
                      style={{
                        background: getStatusButtonColor(order.orderStatus || "Processing"),
                        border: "none",
                        color: "white",
                        padding: "5px",
                        width:"100px",
                        boxShadow:"inset 0px 0px 24px #000000a8",
                        fontWeight: "bold",
                        borderRadius: "5px",
                      }}
                    >
                      {order.orderStatus || "Processing"}
                    </button>
                  </td>
                  <td>
                    <button className="btn btn-outline-dark" onClick={() => handleViewDetails(order.id)}>
                      <EyeFilled />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Orders;
