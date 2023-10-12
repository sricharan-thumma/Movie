import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {  useSelector } from 'react-redux/es/hooks/useSelector';
import { useNavigate } from 'react-router-dom';
import './userdashboard.css'
import  { useState} from 'react';

function UserProfile() {
    let navigate=useNavigate();
    const update=()=>{
        navigate('/Udatedetails')
    }

    let { userobj, isError, isLoading, isSuccess, errMsg } = useSelector((state) => state.user);
  return (
    <div><Card style={{ width: '18rem' }} className='mx-auto mt-50'>
    <Card.Body>
      <Card.Title>Username: {userobj.username}</Card.Title>
      
        <img className="profile-pic m-5" src={userobj.profileImg} alt="error" />
    
      <Card.Text>Email: {userobj.email}</Card.Text>
      <Card.Text>City: {userobj.city}</Card.Text>
    
       
    
        <Button variant="primary" onClick={update}>
          Edit Details
        </Button>
    
    </Card.Body>
  </Card></div>
  )
}

export default UserProfile;