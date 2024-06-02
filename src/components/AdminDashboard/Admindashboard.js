import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import { useSelector } from 'react-redux';
import './Admindashboard.css';
import { useNavigate, Outlet } from 'react-router-dom';
import { FaHome, FaUser, FaUsers, FaInfoCircle } from 'react-icons/fa'; 
function Admindashboard() {
  const { userobj, isSuccess } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <div className="profile-container-nav">
      <div className="profile-sidebar">
        <Nav className="flex-column">
          {/* <Nav.Item>
            <Nav.Link onClick={() => navigate('/dashboard/profileparent/tutorhome')}>
              <FaHome /> Home
            </Nav.Link>
          </Nav.Item> */}
          <Nav.Item>
            <Nav.Link onClick={() => navigate('/admindashboard/addproducts')}>
              <FaUser /> Add Movies
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={() => navigate('/admindashboard/viewproducts')}>
              <FaUsers /> View or delete movies
            </Nav.Link>
          </Nav.Item>
          <Nav.Item></Nav.Item>
          
        </Nav>
      </div>
      <div className="profile-content">
       1
        <Outlet />
      </div>
    </div>
  );
}

export default Admindashboard;
