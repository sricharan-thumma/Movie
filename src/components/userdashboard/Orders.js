import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import './Orders.css'; 

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const { userobj } = useSelector((state) => state.user);

  useEffect(() => {
    
    axios
      .get(`http://localhost:4000/user-api/getusers/${userobj.username}`)
      .then((response) => {
        const userDetails = response.data.payload;
        const ordersArray = userDetails.Orders || [];

        // Reverse the array to display orders in reverse order
        setOrders(ordersArray.reverse());
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
                <img src={order.imgurl} alt={order.name} width="150%" height="100%" />
              </div>
              <div className="order-details">
              <p className="delivered-label text-success">
                <i className="fa fa-check" aria-hidden="true"></i> <h5>Order Placed</h5> 
            </p>
                

                <p className="order-id">Order ID : {order._id}</p>
                <p>Price : ₹{order.price}</p>
                <p>Quantity : {order.quantity}</p>
                <p>Delivary Fee : ₹50</p>
                <p className="order-total">Total Price: ₹{order.quantity * order.price +50}</p> {/* Display total price */}
                <p> ---Order will be delivered within 3 working days</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Orders;
