import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
// import { userLogin } from '../../Slice/UserSlice';
import { adminLogin } from '../../../Slice/AdminSlice';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

// import './Login.css'; 

function AdminLogin() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let { adminobj, isError, isLoading, isSuccessadmin, errMsg } = useSelector((state) => state.admin);
  let dispatch = useDispatch();

  const onFormSubmit = (userCredObj) => {
    dispatch(adminLogin(userCredObj));
  };
  if (isSuccessadmin === true) {
    navigate('/admindashboard');
  }
  const userlog = () => {
    navigate('/login');
  }

  return (
    <div className="login-container">
      <div className="login-heading">Login</div>
      <p>user? <a href="" onClick={userlog}>click here</a> </p>
      <Form className="login-form" onSubmit={handleSubmit(onFormSubmit)}>
        <Form.Group className="login-form-group" controlId="formBasicUserName">
          <Form.Label className='login-form-label'>
            <FontAwesomeIcon icon={faUser} className="icon" /> Username
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Username"
            {...register('username', { required: true })}
          />
          {errors.username && <p className="text-danger">*Username is required</p>}
        </Form.Group>

        <Form.Group className="login-form-group" controlId="formBasicPassword">
          <Form.Label className='login-form-label'>
            <FontAwesomeIcon icon={faLock} className="icon" /> Password
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            {...register('password', { required: true })}
          />
          {errors.password && <p className="text-danger">*Password is required</p>}
        </Form.Group>

        <Button className='login-submit-button' variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
}

export default AdminLogin;
