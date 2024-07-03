import React, { useEffect, useState, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import firebaseInstance from "@/services/firebase";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeliveredProcedureOutlined,
  HomeOutlined,
  PrinterFilled,
} from "@ant-design/icons";
import { displayActionMessage } from "@/helpers/utils";
import OrderDetailsPrint from "./OrderDetailsPrint";
import ReactToPrint from "react-to-print";
import emailjs from '@emailjs/browser';

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const invoiceRef = useRef();
  const componentRef = useRef();
  const history = useHistory();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const orderDoc = await firebaseInstance.db.collection("orders").doc(id).get();
        if (orderDoc.exists) {
          setOrder(orderDoc.data());
        } else {
          setError("Order not found");
        }
      } catch (err) {
        setError("Error fetching order details");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  const sendEmail = (newStatus) => {
    const templateParams = {
      user_name: order?.shippingDetails?.fullname,
      user_email: order?.shippingDetails?.email,
      order_id: id,
      order_status: newStatus,
    };

    emailjs.send('service_r2cp54l', 'template_u5icr7l', templateParams, 'C4yj4xkxzDemU9Wpt')
      .then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
      })
      .catch((error) => {
        console.error('Failed to send email:', error);
      });
  };

  const handleUpdateStatus = async (newStatus) => {
    try {
      await firebaseInstance.updateOrderStatus(id, newStatus);
      setOrder((prevOrder) => ({ ...prevOrder, orderStatus: newStatus }));
      displayActionMessage("Order updated successfully");
      sendEmail(newStatus);
    } catch (error) {
      setError("Error updating order status");
      displayActionMessage("Error updating order status");
    }
  };

  const handleRejectOrder = async () => {
    try {
      await firebaseInstance.updateOrderStatus(id, "rejected");
      const updatedOrder = await firebaseInstance.db.collection("orders").doc(id).get();
      if (updatedOrder.exists) {
        const orderData = updatedOrder.data();
        await firebaseInstance.addOrderToCollection("rejectedOrders", { id, ...orderData });
        await firebaseInstance.deleteOrder(id);
        history.push("/admin/rejected_orders");
        setOrder(null);
        setLoading(false);
        displayActionMessage("This order is rejected and cancelled");
        sendEmail("rejected");
      } else {
        throw new Error("Order not found after updating status");
      }
    } catch (error) {
      setError("Error moving order to rejected");
      displayActionMessage("Error moving order to rejected");
    }
  };

  const handleMoveToDelivered = async () => {
    try {
      await firebaseInstance.updateOrderStatus(id, "delivered");
      const updatedOrder = await firebaseInstance.db.collection("orders").doc(id).get();
      if (updatedOrder.exists) {
        const orderData = updatedOrder.data();
        await firebaseInstance.addOrderToCollection("deliveredOrders", { id, ...orderData });
        await firebaseInstance.deleteOrder(id);
        history.push("/admin/delivered_orders");
        setOrder(null);
        setLoading(false);
        displayActionMessage("Order status updated to delivered and moved to delivered orders");
        sendEmail("delivered");
      } else {
        throw new Error("Order not found after updating status");
      }
    } catch (error) {
      setError("Error moving order to delivered");
      displayActionMessage("Error moving order to delivered");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="order_single_details">
      <div className="show" style={{ display: "none" }}>
        <OrderDetailsPrint ref={componentRef} order={order} id={id} />
      </div>

      <div className="order_single">
        <h2 className="order_single_details_title">Order Details</h2>
        <p className="text-center">
          {order.orderStatus === "delivered"
            ? "this order is successfully delivered 😍"
            : `The current status of the order is ${order.orderStatus}`}
        </p>
        <br />
        <br />
        <div className="order_single_details_content">
          <div className="status_updated_buttons">
            <div className="order_confirmation">
              <button
                className="confirm_btn"
                onClick={() => handleUpdateStatus("confirmed")}
                disabled={
                  order.orderStatus === "confirmed" ||
                  order.orderStatus === "cancelled" ||
                  order.orderStatus === "out for delivery" ||
                  order.orderStatus === "delivered"
                }
              >
                <CheckCircleOutlined />{" "}
                {order.orderStatus === "confirmed" ||
                order.orderStatus === "out for delivery" ||
                order.orderStatus === "delivered"
                  ? "accepted"
                  : "accept order"}
              </button>
              <button
                className="reject_btn"
                onClick={handleRejectOrder}
                disabled={
                  order.orderStatus === "cancelled" ||
                  order.orderStatus === "confirmed" ||
                  order.orderStatus === "out for delivery" ||
                  order.orderStatus === "delivered"
                }
              >
                <CloseCircleOutlined /> Reject Order
              </button>
            </div>
            <div className="status">
              <button
                className="out_delv_btn"
                onClick={() => handleUpdateStatus("out for delivery")}
                disabled={
                  order.orderStatus === "out for delivery" ||
                  order.orderStatus === "delivered"
                }
              >
                <DeliveredProcedureOutlined />{" "}
                {order.orderStatus === "out for delivery"
                  ? "under delivery process"
                  : "Out for Delivery"}
              </button>
              <button
                className="deliv_btn"
                onClick={handleMoveToDelivered}
                disabled={order.orderStatus === "delivered"}
              >
                <HomeOutlined />{" "}
                {order.orderStatus === "delivered"
                  ? "order delivered"
                  : "Delivered"}
              </button>
              <ReactToPrint
                trigger={() => (
                  <button className="print_btn">
                    <PrinterFilled /> Print Order
                  </button>
                )}
                content={() => componentRef.current}
              />
            </div>
          </div>
          {/* ===== product details */}

          <div className="product_details">
            <h3>Product Details</h3>
            {order?.products?.map((product, index) => (
              <div key={index} className="product_details_all">
                <img src={product.imageUrl} alt={product.name} width={50} />
                <div className="detail">
                  <p>Name</p>
                  <span>{product.name}</span>
                </div>
                <div className="detail">
                  <p>Quantity </p>
                  <span>{product.quantity}/p</span>
                </div>
                <div className="detail">
                  <p>Size </p>
                  <span>{product.size}</span>
                </div>
                <div className="detail">
                  <p>Price </p>
                  <span>PKR: {product.price}</span>
                </div>
                <div className="detail">
                  <p>color</p>
                  <span
                    style={{
                      backgroundColor: product.color || "N/A",
                      width: "15px",
                      height: "15px",
                      borderRadius: "50%",
                      marginLeft: "5px",
                    }}
                  ></span>
                </div>
              </div>
            ))}
          </div>
          {/* ===== total cost */}

          <div className="total_price row">
            <div className="col-md-4">
              <p>
                Order ID: <span className="cost_value">{id}</span>
              </p>
            </div>
            <div className="col-md-4">
              <p>
                Payment Type:
                <span className="cost_value">
                  {order.paymentDetails.paymentType}
                </span>
              </p>
            </div>
            <div className="col-md-4">
              <p>
                Payment Method:
                <span className="cost_value">
                  {order.paymentDetails.paymentMethod}
                </span>
              </p>
            </div>
            <div className="col-md-4">
              <p>
                Products Price:
                <span className="cost_value">{order.subtotalAmount}</span>
              </p>
            </div>
            <div className="col-md-4">
              <p>
                Shipping Cost:
                <span className="cost_value">{order.shippingDetails.cost}</span>
              </p>
            </div>
            <div className="col-md-4">
              <p>
                Shipping Details:
                <span className="cost_value">
                  {order.shippingDetails.province},{" "}
                  {order.shippingDetails.district},{" "}
                  {order.shippingDetails.address}
                </span>
              </p>
            </div>
            <div className="col-md-4">
              <p>
                Grand Total:
                <span className="cost_value">{order.totalAmount}</span>
              </p>
            </div>
          </div>
          <div className="order_placed_time">
            <span>Order placed on: {order.dateAdded}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
