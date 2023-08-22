import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { MdLogin } from 'react-icons/md';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let [img, setImg] = useState('');

  const onImageSelect = (event) => {
    setImg(event.target.files[0]);
  };

  const navigate = useNavigate();

  
  

  const onFormSubmit = (userObj) => {
    let formData = new FormData();

    formData.append('userObj', JSON.stringify(userObj));
    formData.append('photo', img);

    axios
      .post('http://localhost:4000/user-api/create-user', formData)
      .then((response) => {
        alert(response.data.message);
        if (response.data.message === 'new user created') {
          navigate('/login');
        }
      })
      .catch((error) => {
        console.log(error);
        alert('Something went wrong in creating user');
      });
  };

  return (
    <div className="signup-container">
    <div className="signup-heading">SignUp</div>
    
      <Form onSubmit={handleSubmit(onFormSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Username"
            {...register('username', { required: true })}
          />
          {errors.username && <p className="text-danger">*Username is required</p>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            {...register('email', { required: true })}
          />
          {errors.email && <p className="text-danger">*Email is required</p>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city or town"
            {...register('city', { required: true })}
          />
          {errors.city && <p className="text-danger">*City is required</p>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            {...register('password', { required: true })}
          />
          {errors.password && <p className="text-danger">*Password is required</p>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Select photo</Form.Label>
          <Form.Control
            type="file"
            {...register('photo', { required: true })}
            onChange={(event) => onImageSelect(event)}
          />
          {errors.photo && <p className="text-danger">*Profile image is required</p>}
        </Form.Group>

        <Button variant="primary" type="submit">
          SignUp <MdLogin />
        </Button>
      </Form>
    </div>
  );
}

export default Signup;
