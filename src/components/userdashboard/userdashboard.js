import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import { useSelector } from 'react-redux';
import './userdashboard.css';
import { useNavigate, Outlet } from 'react-router-dom';
import { FaHome, FaUser, FaUsers, FaInfoCircle } from 'react-icons/fa'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser,faListAlt } from '@fortawesome/free-solid-svg-icons';

function Userdashboard() {
  const { userobj, isSuccess } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <div className="profile-container-nav">
      <div className="profile-sidebar">
        <Nav className="flex-column">
        {/* <Nav.Item>
            <Nav.Link onClick={() => navigate('/userdashboard/cart')}>
            <FontAwesomeIcon icon={faShoppingCart} /> Cart
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={() => navigate('/userdashboard/orders')}>
            <FontAwesomeIcon icon={faListAlt} /> Orders
            </Nav.Link>
          </Nav.Item>
          
          <Nav.Item>
            <Nav.Link onClick={() => navigate('/userdashboard/previousorders')}>
            <FontAwesomeIcon icon={faListAlt} /> Order History
            </Nav.Link>
          </Nav.Item>
          <Nav.Item></Nav.Item> */}
          {/* <Nav.Item>
            <Nav.Link onClick={() => navigate('/dashboard/profileparent/extradetails')}>
              <FaInfoCircle /> Extra Details
            </Nav.Link>
          </Nav.Item> */}
        </Nav>
      </div>
      <div className="profile-content">
       
        <Outlet />
      </div>
    </div>
  );
}

export default Userdashboard;
