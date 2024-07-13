import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Bar, Pie, Line } from "react-chartjs-2";
import "chart.js/auto";
import firebaseInstance from "@/services/firebase"; // Adjust the import according to your file structure
import { useDocumentTitle, useScrollTop } from "@/hooks";
import {
  CalendarFilled,
  DeliveredProcedureOutlined,
  DollarCircleOutlined,
  OrderedListOutlined,
  EyeFilled,
} from "@ant-design/icons";
import * as ROUTES from "@/constants/routes";

const Dashboard = () => {
  useDocumentTitle("Welcome | Admin Dashboard");
  useScrollTop();
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [totalDeliveredProducts, setTotalDeliveredProducts] = useState(0);
  const [yearlyEarnings, setYearlyEarnings] = useState(0);
  const [chartData, setChartData] = useState({});
  const [lineChartData, setLineChartData] = useState({});
  const [pieData, setPieData] = useState({});
  const [filter, setFilter] = useState("thisMonth");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pendingOrders, setPendingOrders] = useState([]);
  const history = useHistory();

  // handle orderDetails
  const handleViewDetails = (orderId) => {
    history.push(`${ROUTES.ORDER_DETAILS.replace(":id", orderId)}`);
  };

  useEffect(() => {
    const fetchDeliveredOrders = async () => {
      try {
        setLoading(true);
        const deliveredOrdersSnapshot =
          await firebaseInstance.getDeliveredOrders();
        const deliveredOrders = deliveredOrdersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const allOrdersSnapshot = await firebaseInstance.getAllOrders();
        const allOrders = allOrdersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Filter and process data based on the selected filter
        const filteredOrders = filterOrders(deliveredOrders, filter);

        const totalEarnings = filteredOrders.reduce(
          (sum, order) => sum + order.total,
          0
        );
        setTotalEarnings(totalEarnings);

        const totalDeliveredProducts = filteredOrders.reduce(
          (sum, order) => sum + order.products.length,
          0
        );
        setTotalDeliveredProducts(totalDeliveredProducts);

        const monthlyEarnings = Array(12).fill(0);
        const dailyEarnings = Array(31).fill(0);
        let yearlyTotal = 0;
        deliveredOrders.forEach((order) => {
          const month = new Date(order.createdAt).getMonth();
          const day = new Date(order.createdAt).getDate();
          monthlyEarnings[month] += order.total;
          dailyEarnings[day - 1] += order.total;
          yearlyTotal += order.total;
        });
        setYearlyEarnings(yearlyTotal);

        const chartData = {
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          datasets: [
            {
              label: "Earnings",
              data: monthlyEarnings,
              backgroundColor: "#003a63", // Update bar color here
         // Update bar border color here
              borderWidth: 1,
            },
          ],
        };
        setChartData(chartData);

        const lineChartData = {
          labels: Array.from({ length: 31 }, (_, i) => i + 1),
          datasets: [
            {
              label: "Daily Earnings",
              data: dailyEarnings,
              fill: false,
              borderColor: "#fe8c05",
              tension: 0.1,
            },
          ],
        };
        setLineChartData(lineChartData);

        const pieChartData = {
          labels: ["Earnings", "Delivered Products"],
          datasets: [
            {
              data: [totalEarnings, totalDeliveredProducts],
              backgroundColor: [
                "rgba(83, 217, 217, 0.7)",
                "rgba(0, 43, 73, 0.7)",
              ],
              borderWidth: 1,
            },
          ],
        };
        setPieData(pieChartData);

        const pendingOrders = allOrders.filter(
          (order) => order.orderStatus === "Processing"
        );
        setPendingOrders(pendingOrders);

        setLoading(false);
        setError(null);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
        setError("Failed to fetch earnings data.");
      }
    };

    fetchDeliveredOrders();
  }, [filter]);

  const filterOrders = (orders, filter) => {
    const now = new Date();
    let filteredOrders = [];

    switch (filter) {
      case "today":
        filteredOrders = orders.filter((order) =>
          isSameDay(new Date(order.createdAt), now)
        );
        break;
      case "thisMonth":
        const thisMonth = now.getMonth();
        filteredOrders = orders.filter(
          (order) => new Date(order.createdAt).getMonth() === thisMonth
        );
        break;
      default:
        const monthIndex = parseInt(filter, 10);
        filteredOrders = orders.filter(
          (order) => new Date(order.createdAt).getMonth() === monthIndex
        );
        break;
    }

    return filteredOrders;
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      {loading ? (
        <div className="dashboard p-3 h-100 d-flex align-items-center justify-content-center">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12 text-center">
                <div className="order_loader"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="dashboard p-3">
          <div className="container-fluid">
            <h2 className="dashboard_title">Welcome to Admin Dashboard</h2>
            <div className="row pie-chart-row justify-content-between">
              <div className="col-md-3 earning-box">
                <div className="earning-box-content">
                  <h3>Total Earnings (monthly)</h3>
                  <p>PKR: {totalEarnings}</p>
                </div>
                <div className="icon">
                  <CalendarFilled />
                </div>
              </div>
              <div className="col-md-3 earning-box">
                <div className="earning-box-content">
                  <h3>Total Earnings (yearly)</h3>
                  <p>PKR: {yearlyEarnings}</p>
                </div>
                <div className="icon">
                  <DollarCircleOutlined />
                </div>
              </div>
              <div className="col-md-3 earning-box">
                <div className="earning-box-content">
                  <h3>Delivered Orders</h3>
                  <p>{totalDeliveredProducts}</p>
                </div>
                <div className="icon">
                  <DeliveredProcedureOutlined />
                </div>
              </div>
              <div className="col-md-3 earning-box">
                <div className="earning-box-content">
                  <h3>Pending Orders</h3>
                  <p>{pendingOrders.length}</p>
                </div>
                <div className="icon">
                  <OrderedListOutlined />
                </div>
              </div>
            </div>
            {/* filter */}
            <div className="earning_filter d-flex align-content-center justify-content-between">
              <h2 className="earning_filter_title">Earning Overview</h2>
              <select
                onChange={(e) => setFilter(e.target.value)}
                value={filter}
              >
                <option value="today">Today's Earnings</option>
                <option value="thisMonth">This Month</option>
                {[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ].map((month, index) => (
                  <option key={index} value={index}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
            <div className="row mt-3">
              <div className="col-md-7">
                <div
                  className="dashboard-section"
                  style={{
                    minHeight: "400px",
                    height: "400px",
                    minWidth: "100%",
                    width: "100%",
                  }}
                >
                  <Bar
                    data={chartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        x: {
                          grid: {
                            display: false,
                          },
                        },
                        y: {
                          beginAtZero: true,
                          ticks: {
                            callback: function (value) {
                              return "₨" + value;
                            },
                          },
                          title: {
                            display: true,
                            text: "Amount in PKR",
                          },
                        },
                      },
                      plugins: {
                        legend: {
                          display: true,
                          position: "top",
                        },
                        tooltip: {
                          callbacks: {
                            label: function (tooltipItem) {
                              return "₨" + tooltipItem.raw;
                            },
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>
              <div className="col-md-5">
                <div
                  className="dashboard-section"
                  style={{
                    minHeight: "300px",
                    height: "300px",
                    minWidth: "100%",
                    width: "100%",
                    boxShadow: "0px 0px 8px #00000038"
                  }}
                >
                  <Line
                    data={lineChartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        x: {
                          grid: {
                            display: false,
                          },
                        },
                        y: {
                          beginAtZero: true,
                          ticks: {
                            callback: function (value) {
                              return "₨" + value;
                            },
                          },
                          title: {
                            display: true,
                            text: "Amount in PKR",
                          },
                        },
                      },
                      plugins: {
                        legend: {
                          display: true,
                          position: "top",
                        },
                        tooltip: {
                          callbacks: {
                            label: function (tooltipItem) {
                              return "₨" + tooltipItem.raw;
                            },
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Pending orders  */}
          <div className="row mt-5">
            <div className="col-md-12">
              <h1 className="text-center">
                <b>Pending orders</b>
              </h1>
            </div>
            <div className="col-md-12">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Customer Name</th>
                    <th>Total Amount</th>
                    <th>Order Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingOrders.map((order, index) => (
                    <tr key={order.id}>
                      <td>
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
                            {/* <div>{product.name}</div>
                    <div>Qty: {product.quantity}</div> */}
                          </div>
                        ))}
                      </td>
                      <td>{order.shippingDetails.fullname}</td>
                      <td>{order.total}</td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button
                          className="btn btn-outline-dark"
                          onClick={() => handleViewDetails(order.id)}
                        >
                          <EyeFilled />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
