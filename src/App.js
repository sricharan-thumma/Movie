import logo from './logo.svg';
import './App.css';
import { Navigate } from 'react-router-dom';
import Signup from './components/Signup/Signup'
import Login from './components/Login/UserLogin/Login'
import Home  from './components/Home/Home';
import {Route,Routes} from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { clearLoginStatus } from './Slice/UserSlice';
import { clearAdminLoginStatus } from './Slice/AdminSlice';
import { NavDropdown } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Userdashboard from './components/userdashboard/Userdashboard';
import UserProfile from './components/userdashboard/UserProfile';
import Updatedetails from './components/userdashboard/Updatedetails';
import AdminSignup from './components/Signup/AdminSignup';
import AdminLogin from './components/Login/AdminLogin/AdminLogin';
import Admindashboard from './components/AdminDashboard/Admindashboard';
import AddProducts from './components/AdminDashboard/AddProducts';
import ViewProducts from './components/AdminDashboard/ViewProducts';

import { useEffect } from 'react';
import { userLogin } from './Slice/UserSlice';
import { adminLogin } from './Slice/AdminSlice';
import { rehydrateUser } from './Slice/Rehydrateuser';
import ProductsList from './components/userdashboard/ProductsList';
import Cart from './components/userdashboard/Cart';
import Orders from './components/userdashboard/Orders';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import PreviousOrders from './components/userdashboard/PreviousOrders';

function App() {
  let { userobj, isSuccess } = useSelector((state) => state.user);
  let { adminobj, isSuccessadmin } = useSelector((state) => state.admin);
console.log(userobj); 
const dispatch = useDispatch();
const navigate=useNavigate();
useEffect(() => {
  // Dispatch the rehydrateUser action when the app loads
  dispatch(rehydrateUser());
}, [dispatch])
  const adminToken = localStorage.getItem('token');

  

  const userLogout = () => {
    localStorage.clear();
    var x = clearLoginStatus()
    dispatch(x);
    navigate('/login')
  }
  const adminLogout = () => {
    localStorage.clear();
    var x = clearAdminLoginStatus()
    dispatch(x);
    navigate('/adminlogin')
  }

  const shouldDisplayHome = !isSuccess && !isSuccessadmin;
  const shouldDisplayUserLogout = isSuccess;
  const shouldDisplayadminLogout = isSuccessadmin;
  console.log('isSuccessadmin:', isSuccessadmin);
 
  return (
    <div className="App">
      
      <Navbar expand="lg" className="navbar-transparent">
        <Container>
          <Navbar.Brand href="#home">Movie Library</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="justify-content-end">
            <Nav  className="ml-auto">
                            {shouldDisplayHome && (
                  <>
                    
                    <NavLink className="nav-link" to="/signup">
                      <FontAwesomeIcon icon={faUser} /> Signup
                    </NavLink>
                    {/* <NavLink className="nav-link" to="/adminsignup">
                      <FontAwesomeIcon icon={faUser} /> Admin
                    </NavLink> */}
                    <NavLink className="nav-link" to="/login">
                      <FontAwesomeIcon icon={faUser} /> Login
                    </NavLink>
                  </>
                )}

                {shouldDisplayUserLogout && (
                  <>
                    <NavLink className="nav-link" to="/productslist">
                       Home
                    </NavLink>
                    <NavLink className="nav-link" to="/userdashboard/cart">
                      Movies List
                    </NavLink>
                    
                    <NavDropdown title={userobj ? userobj.username : 'temp'} id="basic-nav-dropdown">
                      <NavDropdown.Item as={NavLink} to="/Userdashboard/userprofile">
                      <FontAwesomeIcon icon={faUser} />  Profile
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={userLogout}>Logout</NavDropdown.Item>
                    </NavDropdown>
                  </>
                )}

              { shouldDisplayadminLogout  && (
                  <>
                  <NavDropdown title={adminobj ? adminobj.username : 'temp'} id="basic-nav-dropdown">
                  
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={adminLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
                  </>
              )}
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/adminlogin" element={<AdminLogin />} />
      <Route path='/adminsignup' element={<AdminSignup/>}/>
     
      <Route path='/productslist' element={<ProductsList/>}/>
      <Route path='/userdashboard' element={<Userdashboard/>}>
          <Route path='userprofile' element={<UserProfile/>}/>
          <Route path='previousorders' element={<PreviousOrders/>}/>
          <Route path='cart' element={<Cart/>}/>
          <Route path='orders' element={<Orders/>}/>
          <Route path='udatedetails' element={<Updatedetails/>}/>
          <Route path="" element={<Navigate to="userprofile" replace />} />
      </Route>
      <Route path='/admindashboard' element={<Admindashboard/>}>
          <Route path='addproducts' element={<AddProducts/>}/>  
          <Route path='viewproducts' element={<ViewProducts/>}/>         
      </Route>
      
      
      <Route >

      </Route>
      </Routes>
    </div>
  );
}

export default App;
