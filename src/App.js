import logo from './logo.svg';
import './App.css';
import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'
import Home  from './components/Home/Home';
import {Route,Routes} from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { clearLoginStatus } from './Slice/UserSlice';
import { NavDropdown } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Userdashboard from './components/userdashboard/userdashboard';

function App() {
  let { userobj, isSuccess } = useSelector((state) => {
    //  console.log('state',state)
    return state.user
  });
  let dispatch = useDispatch()

  let navigate = useNavigate();

  const userLogout = () => {
    localStorage.clear();
    var x = clearLoginStatus()
    dispatch(x);
    navigate('/login')
  }
 
  return (
    <div className="App">
      
      <Navbar expand="lg" className="navbar-transparent">
        <Container>
          <Navbar.Brand href="#home">Zebu</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="justify-content-end">
            <Nav fill variant="pills" className="ml-auto">
              {isSuccess!==true ? (
              <>
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
              <NavLink className="nav-link" to="/signup">
                Signup
              </NavLink>
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
              </>
              ):(
                <>
                <NavDropdown title={userobj ? userobj.username : 'temp'} id="basic-nav-dropdown">
              
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={userLogout}>Logout</NavDropdown.Item>
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
      <Route path="/Login" element={<Login />} />
      <Route path='/Userdashboard' element={<Userdashboard/>}/>
      </Routes>
    </div>
  );
}

export default App;
