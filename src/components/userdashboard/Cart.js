// Cart.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './Cart.css'
function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const { userobj } = useSelector((state) => state.user);

  useEffect(() => {
    // Fetch tutor's existing details and set the initial state
    axios
      .get(`http://localhost:4000/user-api/getusers/${userobj.username}`)
      .then((response) => {
        console.log(userobj)
        const userDetails = response.data.payload;
        const CartArray = userDetails.Cart || [];

        setCartItems(CartArray);
      })
      .catch((error) => {
        console.error('Error fetching tutor data:', error);
      });
  }, [userobj.username]);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + parseFloat(item.price), 0);
  };
  

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      <div className="cart-items">
        {cartItems.length === 0 ? (
          <p>No items added yet</p>
        ) : (
          cartItems.map((item) => (
            <div key={item._id} className="cart-item">
              <img src={item.imgurl} alt={item.productname} />
              <h2>{item.productname}</h2>
              <p>Price: ₹{item.price}</p>
              {/* Add more item details here */}
            </div>
          ))
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="billing-summary">
          <h2>Billing Summary</h2>
          <p>Total Items: {cartItems.length}</p>
          <p>Total Price: ₹{calculateTotal()}</p>
          <button className="buy-now-button">Buy Now</button>
        </div>
      )}
    </div>
  );
}

export default Cart;
