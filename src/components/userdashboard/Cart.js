import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './Cart.css';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const { userobj } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    
    axios
      .get(`http://localhost:4000/user-api/getusers/${userobj.username}`)
      .then((response) => {
        const userDetails = response.data.payload;
        const CartArray = userDetails.Cart || [];

        const updatedCart = CartArray.map((item) => ({
          ...item,
          quantity: !isNaN(item.quantity) && item.quantity > 0 ? parseInt(item.quantity) : 1,
        }));

        setCartItems(updatedCart);
        setTotalItems(updatedCart.reduce((total, item) => total + item.quantity, 0));
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, [userobj.username]);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + parseFloat(item.price * item.quantity), 0);
  };

  const handleRemove = (productobj) => {
   
    axios
      .post(`http://localhost:4000/user-api/remove-from-cart`, {
        productobj: productobj,
        username: userobj.username,
      })
      .then((response) => {
        setCartItems(response.data.payload);
        setTotalItems(response.data.payload.reduce((total, item) => total + item.quantity, 0));
      })
      .catch((error) => {
        console.error('Error removing item:', error);
      });
  };

  const handleQuantityChange = (productobj, newQuantity) => {
    const updatedCart = [...cartItems];
    const productIndex = updatedCart.findIndex((item) => item._id === productobj._id);

    if (productIndex !== -1) {
      if (newQuantity <= 0) {
        updatedCart.splice(productIndex, 1);
      } else {
        updatedCart[productIndex].quantity = newQuantity;
      }

      setCartItems(updatedCart);
      setTotalItems(updatedCart.reduce((total, item) => total + item.quantity, 0));

      axios
        .post(`http://localhost:4000/user-api/update-cart`, {
          cartItems: updatedCart,
          username: userobj.username,
        })
        .then((response) => {
          // alert("Quantity updated successfully");
        })
        .catch((error) => {
          console.error('Error updating quantity:', error);
        });
    }
  };

  const handleBuyNow = (cartItems) => {
    const orderItems = cartItems.map((item) => ({
      ...item,
      quantity: item.quantity, 
    }));

    axios
      .post('http://localhost:4000/user-api/buy-now', {
        cartItems: orderItems,
        username: userobj.username,
      })
      .then((response) => {
        setCartItems(response.data.payload);
        setTotalItems(0); // Reset the total number of items
        // alert("Order placed successfully");
        navigate('/userdashboard/orders');
      })
      .catch((error) => {
        console.error('Error occurred:', error);
      });
  };

  return (
    <div className="cart-container">
      <h1>Movies List</h1>
      <div className="cart-items">
        {cartItems.length === 0 ? (
          <p>No items added yet</p>
        ) : (
          cartItems.map((item) => (
            <div key={item._id} className="cart-item">
              <div className="cart-item-image">
                <img src={item.imgurl} alt={item.productname} />
              </div>
              <div className="cart-item-details">
                <h2>{item.productname}</h2>
               
                {/* <div className="quantity">
                  <button onClick={() => handleQuantityChange(item, item.quantity - 1)} primary> <b>-</b> </button>
                    
                  
                  <span >{item.quantity}</span>

                  <button onClick={() => handleQuantityChange(item, item.quantity + 1)}> <b>+</b>  </button>
                </div> */}
                <button className="remove" onClick={() => handleRemove(item)}>
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      
    </div>
  );
}

export default Cart;
