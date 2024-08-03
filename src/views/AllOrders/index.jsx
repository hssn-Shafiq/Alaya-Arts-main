import React, { useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import useUserOrders from "@/hooks/useUserOrders";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
// import './AllOrders.css'; // Import the CSS file

const AllOrders = () => {
  const { orders, isLoading, error } = useUserOrders();
  const [hiddenOrders, setHiddenOrders] = useState([]);

  const hideOrder = (orderId) => {
    setHiddenOrders([...hiddenOrders, orderId]);
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

  if (isLoading) {
    return (
      <div className="text-center fs-1 fw-bold my-5 text-warning">
        Loading orders...
      </div>
    );
  }
  if (orders.length == 0) {
    return (
      <>
        <div className="text-center my-5">
          <h1 className="fs-1 fw-bolder text-danger mb-2">No order found...</h1>
          <Link to="/collection/shop">
            {" "}
            <button type="button" class="btn btn-info fs-2 text-light fw-bold">
              Shop Now
            </button>
          </Link>
        </div>
      </>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="container all_orders_main">
        <h2 className="text-center fs-1 fw-bolder">My Orders</h2>
        <div className="orders">
          {orders.length > 0 ? (
            orders.map((order) =>
              hiddenOrders.includes(order.id) ? null : (
                <div className="order" key={order.id}>
                  <div
                    className="order-info d-flex justify-content-between flex-wrap"
                    data-spm-anchor-id="a2a0e.order_list.0.i3.a65d7d689cl5JA"
                  >
                    <div className="pull-left">
                      <div className="info-order-left-text fs-5 fs-2">
                        Order <a className="link">#{order.id}</a>
                      </div>
                      <p className="text info desc fs-5  fs-md-4">
                        Placed on{" "}
                        {new Date(order.createdAt).toLocaleString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </p>
                    </div>
                    <p className="text-secondary mb-0 fs-5  fs-md-1 fw-bold ">
                      Will be delivered between 4 to 5 working days
                    </p>
                    <div className="pull-right ">
                      <CloseOutlined
                        className="cursor-pointer"
                        onClick={() => hideOrder(order.id)}
                      />
                    </div>
                  </div>

                  {/* <____________________________roder-items start______________________></____________________________roder-items> */}
                  <div className="order-items row d-flex">
                    {order.products.map((product, index) => (
                      <div className="order-item border-0 col-12 col-md-7 flex-row p-md-0" key={index}>
                        <div className="item-pic d-flex gap-4 p-3 col-md-7" data-spm="detail_image">
                          <img src={product.imageUrl} alt={product.name} />
                          <div>
                            <div
                              className="text title item-title fs-2 fw-bold fs-md-3"
                              data-spm="details_title"
                            >
                              {product.name}
                            </div>
                            <p className="fs-3 fw-medium text-subtitle">
                              Size: {product.size}
                            </p>
                            <p className=" fs-3 fw-medium text-subtitle">
                              Quantity: {product.quantity}
                            </p>
                            <p className=" fw-medium text-subtitle">
                              {(product.accessoryDetail == null) ? " " : product.accessoryDetail}
                            </p>
                          </div>
                        </div>
                       
                        <div className="col-md-5 item-status item-capsule d-flex flex-column justify-content-between pb-4">
                          <button
                           style={{
                            background: getStatusButtonColor(order.orderStatus),
                            border: "none",
                            color: "white",
                            padding: "5px",
                            width:"100px",
                            boxShadow:"inset 0px 0px 24px #000000a8",
                            fontWeight: "bold",
                            borderRadius: "5px",
                          }}
                          >{order.orderStatus}</button>
                          <p className="capsule fw-bold text-subtitle">Price/item: {product.price}/pkr</p>
                        </div>
                      </div>
                    ))}
                    <div
                      className="order-info col-md-5 "
                      style={{
                        borderLeft: "2px solid #dadada",
                        borderBottom: "none",
                      }}
                      data-spm-anchor-id="a2a0e.order_list.0.i3.a65d7d689cl5JA"
                    >
                      <div className="pull-left">
                        <div className="info-order-left-text">
                          Contact:
                          <span className="ms-2">
                            +{order.shippingDetails.mobile.value}
                          </span>
                        </div>
                        <div className="info-order-left-text">
                          Shipped to:
                          <span className="ms-2">
                            {order.shippingDetails.address}
                          </span>
                        </div>
                      </div>
                      <div className=" text-end bg-dark text-light p-3 fw-bolder">
                        Total amount: {Math.round(order.total)}/pkr
                      </div>
                    </div>
                  </div>
                  {/* <____________________________roder-items end______________________></____________________________roder-items> */}
                </div>
              )
            )
          ) : (
            <div className="text-center">
              <h2 className="fs-1 fw-bolder text-danger">no orders found</h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AllOrders;
