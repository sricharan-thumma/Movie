import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { userLogin } from '../../Slice/UserSlice';
import { useNavigate } from 'react-router-dom';

import './Login.css'; 

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let { userobj, isError, isLoading, isSuccess, errMsg } = useSelector((state) => state.user);
  let dispatch = useDispatch();

  const onFormSubmit = (userCredObj) => {
    dispatch(userLogin(userCredObj));
  };
  if (isSuccess === true) {
    navigate('/Userdashboard');
  }

  

  return (
    <div className="login-container"> {/* Apply the custom container style */}
      
      <div className="login-heading">Login</div>
      <Form className="login-form" onSubmit={handleSubmit(onFormSubmit)}>
        <Form.Group className="login-form-group" controlId="formBasicUserName">
          <Form.Label className='login-form-label'>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Username"
            {...register('username', { required: true })}
          />
          {errors.username && <p className="text-danger">*Username is required</p>}
        </Form.Group>

        <Form.Group className="login-form-group" controlId="formBasicPassword">
          <Form.Label className='login-form-label'> Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            {...register('password', { required: true })}
          />
          {errors.password && <p className="text-danger">*password is required</p>}
        </Form.Group>

        <Button className='login-submit-button' variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Login;
