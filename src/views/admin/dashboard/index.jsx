import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import firebaseInstance from '@/services/firebase'; // Adjust the import according to your file structure
import { useDocumentTitle, useScrollTop } from '@/hooks';

const Dashboard = () => {
  useDocumentTitle('Welcome | Admin Dashboard');
  useScrollTop();
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [totalDeliveredProducts, setTotalDeliveredProducts] = useState(0);
  const [chartData, setChartData] = useState({});
  const [pieData, setPieData] = useState({});
  const [filter, setFilter] = useState('today');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDeliveredOrders = async () => {
      try {
        setLoading(true);
        const deliveredOrdersSnapshot = await firebaseInstance.getDeliveredOrders();
        const deliveredOrders = deliveredOrdersSnapshot.docs.map(doc => doc.data());

        // Filter and process data based on the selected filter
        const filteredOrders = filterOrders(deliveredOrders, filter);

        const totalEarnings = filteredOrders.reduce((sum, order) => sum + order.total, 0);
        setTotalEarnings(totalEarnings);

        const totalDeliveredProducts = filteredOrders.reduce((sum, order) => sum + order.products.length, 0);
        setTotalDeliveredProducts(totalDeliveredProducts);

        const chartData = {
          labels: filteredOrders.map(order => new Date(order.createdAt).toLocaleDateString()), // Adjust date handling
          datasets: [
            {
              label: 'Earnings',
              data: filteredOrders.map(order => order.total),
              backgroundColor: 'rgba(83, 217, 217, 0.7)',
              borderWidth: 1,
            },
            {
              label: 'Delivered Products',
              data: filteredOrders.map(order => order.products.length),
              backgroundColor: 'rgba(0, 43, 73, 0.7)',
              borderWidth: 1,
            },
          ],
        };
        setChartData(chartData);

        const pieChartData = {
          labels: ['Earnings', 'Delivered Products'],
          datasets: [{
            data: [totalEarnings, totalDeliveredProducts],
            backgroundColor: ['rgba(83, 217, 217, 0.7)', 'rgba(0, 43, 73, 0.7)'],
            borderWidth: 1,
          }],
        };
        setPieData(pieChartData);

        setLoading(false);
        setError(null);
      } catch (error) {
        console.error('Error fetching delivered orders:', error);
        setLoading(false);
        setError('Failed to fetch earnings data.');
      }
    };

    fetchDeliveredOrders();
  }, [filter]);

  const filterOrders = (orders, filter) => {
    const now = new Date();
    let filteredOrders = [];

    switch (filter) {
      case 'today':
        filteredOrders = orders.filter(order => isSameDay(new Date(order.createdAt), now));
        break;
      case 'yesterday':
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        filteredOrders = orders.filter(order => isSameDay(new Date(order.createdAt), yesterday));
        break;
      case 'lastWeek':
        const lastWeek = new Date(now);
        lastWeek.setDate(lastWeek.getDate() - 7);
        filteredOrders = orders.filter(order => new Date(order.createdAt) > lastWeek);
        break;
      default:
        filteredOrders = orders;
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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="dashboard">
      <h2>Welcome to Admin Dashboard</h2>

      <div className="filter">
        <button onClick={() => setFilter('today')}>Today</button>
        <button onClick={() => setFilter('yesterday')}>Yesterday</button>
        <button onClick={() => setFilter('lastWeek')}>Last Week</button>
      </div>

      <div className="row pie-chart-row">
        <div className="col-pi-6 dashboard-section">
          <h3>Total Earnings</h3>
          <p>PKR: {totalEarnings}</p>
        </div>
        <div className="col-pi-6">
          <Pie
            data={pieData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top',
                },
              },
            }}
          />
        </div>
      </div>

      <div className="dashboard-section">
        <h3>Total Delivered Products</h3>
        <p>{totalDeliveredProducts}</p>
      </div>

      <div className="dashboard-section" style={{ minHeight: '400px', height: '400px',minWidth: '500px', width: '500px' }}>
        <h3>Earnings and Delivered Products Bar Chart</h3>
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
                  callback: function(value) {
                    return '₨' + value;
                  },
                },
                title: {
                  display: true,
                  text: 'Amount in PKR',
                },
              },
            },
            plugins: {
              legend: {
                display: true,
                position: 'top',
              },
              tooltip: {
                callbacks: {
                  label: function(tooltipItem) {
                    return '₨' + tooltipItem.raw;
                  },
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Dashboard;
