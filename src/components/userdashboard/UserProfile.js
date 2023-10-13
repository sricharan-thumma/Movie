import React from 'react';
import { useSelector } from 'react-redux';
import './PreviousOrders.css';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import './UserProfile.css'
function UserProfile() {
  const { userobj } = useSelector((state) => state.user);

  if (userobj && userobj.Orders && userobj.Orders.length > 0) {
    let prevorderquantity = userobj.Orders[0]?.quantity || 0;

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
        <Card className="profile-card">
          <Card.Body>
            <Card.Title className="profile-info">Username: {userobj.username}</Card.Title>

            <img className="profile-pic" src={userobj.profileImg} alt="Profile" width="100%" height="100%" />

            <Card.Text className="profile-info">Email: {userobj.email}</Card.Text>
            <Card.Text className="profile-info">City: {userobj.city}</Card.Text>

            <Button variant="primary" className="edit-button">
              Edit Details
            </Button>
          </Card.Body>
        </Card>

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
      </div>
    );
  } else {
    return <div>
      <Card className="profile-card">
          <Card.Body>
            <Card.Title className="profile-info">Username: {userobj.username}</Card.Title>

            <img className="profile-pic" src={userobj.profileImg} alt="Profile" width="100%" height="100%" />

            <Card.Text className="profile-info">Email: {userobj.email}</Card.Text>
            <Card.Text className="profile-info">City: {userobj.city}</Card.Text>

            <Button variant="primary" className="edit-button">
              Edit Details
            </Button>
          </Card.Body>
        </Card>
      No previous orders available.</div>;
  }
}

export default UserProfile;
