import React from 'react';
import { useSelector } from 'react-redux';
import './PreviousOrders.css';

function PreviousOrders() {
  const { userobj } = useSelector((state) => state.user);

  if (userobj && userobj.Orders && userobj.Orders.length > 0) {
    let prevorderquantity = userobj.Orders[0].quantity;

    const previousOrders = userobj.Orders.slice(prevorderquantity);

    const spendingCategories = {};
    const preferredBrands = {};

    previousOrders.forEach((order) => {
      if (spendingCategories[order.category]) {
        spendingCategories[order.category] += order.quantity * order.price;
      } else {
        spendingCategories[order.category] = order.quantity * order.price;
      }

      if (preferredBrands[order.Brand]) {
        preferredBrands[order.Brand]++;
      } else {
        preferredBrands[order.Brand] = 1;
      }
    });

    return (
      <div>
       <div className="summary-container">
  <div className="data-table-container">
    <h3 className='mt-3'>Shopping Analytics</h3>
    <table className="data-table spending-categories">
      <thead>
        <tr>
          <th colSpan="2">Spending Categories </th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(spendingCategories).map((category) => (
          <tr key={category}>
            <td className="category-name">{category}:</td>
            <td className="category-amount">₹{spendingCategories[category]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  <div className="data-table-container">
    <table className="data-table preferred-brands">
      <thead>
        <tr>
          <th colSpan="2">Preferred Brands</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(preferredBrands).map((brand) => (
          <tr key={brand}>
            <td className="brand-name">{brand} :</td>
            <td className="brand-count">{preferredBrands[brand]} purchases</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>


        <h2>Order History</h2>
        <ul>
          {previousOrders.map((order, index) => (
            <li key={index} className="order-item">
              <div className="order-image">
                <img src={order.imgurl} alt={order.name} width="150%" height="100%" />
              </div>
              <div className="order-details">
                <p className="delivered-label text-success">
                  <i className="fa fa-check" aria-hidden="true"></i> <h5>Order Delivered</h5>
                </p>

                <p className="order-id">Order ID : {order._id}</p>
                <p>Price : ₹{order.price}</p>
                <p>Quantity : {order.quantity}</p>

                <p className="order-total">Total Price: ₹{order.quantity * order.price + 50}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return <div>No previous orders available.</div>;
  }
}

export default PreviousOrders;
