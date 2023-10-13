import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import './Orders.css'; // Import your CSS file

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const { userobj } = useSelector((state) => state.user);

  useEffect(() => {
    // Fetch tutor's existing details and set the initial state
    axios
      .get(`http://localhost:4000/user-api/getusers/${userobj.username}`)
      .then((response) => {
        const userDetails = response.data.payload;
        const ordersArray = userDetails.Orders || [];

        setOrders(ordersArray);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching orders data:', error);
      });
  }, [userobj.username]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="orders-container">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders available.</p>
      ) : (
        <ul className="orders-list">
          {orders.map((order, index) => (
            <li key={index} className="order-item">
              <div className="order-image">
                <img src={order.imgurl} alt={order.name} width="100%" height="100%" />
              </div>
              <div className="order-details">
                <p className="delivered-label">Delivered</p>
                <p className="order-id">Order ID: {order._id}</p>
                <p className="order-total">Order Total: ₹{order.price}</p>
                {/* Add more details as needed */}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Orders;
