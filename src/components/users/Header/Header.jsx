import React, {useRef} from 'react'
import {Container,Row,Col} from "reactstrap";
import {Link,NavLink} from 'react-router-dom'
import './Header.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/features/auth/authSlice';

const navLinks = [
  {
    path:'/',
    display:'Home'
  },
  {
    path:'/cars',
    display:'Cars'
  },
  {
    path:'/about',
    display:'About'
  },
  {
    path:'/contact',
    display:'Contact'
  }
]

const Header = () => {

  const user = JSON.parse(localStorage.getItem('user'))

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  const menuRef = useRef(null)

  const toggleMenu = ()=> menuRef.current.classList.toggle('menu_active')


  return <header className="header">
    
    {/* ---------  header top ------------  */}
   <div className='header_top'>
    <Container>
      <Row>
        <Col lg='6' md='6' sm='6'>
          <div className='header_top_left'>
            <span>Need Help?</span>
            <span className='header_top_help'>
            <i class="ri-phone-fill"></i> +91 6282314460
            </span>
          </div>
        </Col>

        <Col lg='6' md='6' sm='6'>
          <div className='header_top_right d-flex align-items-center justify-content-end gap-3'>
          
              {user?.fullName ? (
                <>
              <Link to={'/profile'} className='d-flex align-items-center gap-1 ms-3'>
              <i class="ri-account-circle-line"></i>{user.fullName}
              </Link>
              <Link>
              <span onClick={userLogout} className='d-flex align-items-center gap-1  ms-3'>
              <i class="ri-logout-box-r-line"></i> Logout
              </span>
              </Link>
              </>
              ): (
                <>
                <Link to='/login' className='d-flex align-items-center gap-1'>
             <i class="ri-login-circle-line"></i> Login 
             </Link>
          <Link to='/signup' className='d-flex align-items-center gap-1'>
             <i class="ri-user-line"></i> Signup
              </Link>
                </>
              )}
          </div>
        </Col>
      </Row>
    </Container>
   </div>

   {/* ---------- header middle --------- */}
   <div className='header_middle'>
    <Container>
      <Row>
        <Col lg='3' md='3' sm='4'>
          <div className="logo1">
            <h1><Link to='/' className='d-flex align-items-center gap-2'>
            <i class="ri-car-line"></i>
            <span>Fastrack</span>
              </Link></h1>
          </div>
        </Col>

        <Col lg='3' md='3' sm='4'>
          <div className="header_location  d-flex align-items-center gap-2">
            <span><i class="ri-earth-line"></i></span>
            <div className="header_location-content">
              <h4>India</h4>
              <h6>Malappuram, Kerala</h6>
            </div>
          </div>
        </Col>


        <Col lg='3' md='3' sm='4'>
          <div className="header_location d-flex align-items-center gap-2">
            <span><i class="ri-time-line"></i></span>
            <div className="header_location-content">
              <h4>Monday to Sunday</h4>
              <h6>10am - 9pm</h6>
            </div>
          </div>
        </Col>

        <Col lg='2' md='3' sm='0' className='d-flex align-items-center justify-content-end'>
          <button className='header_btn btn'>
            <Link to='/contact'>
            <i class="ri-phone-line"></i> Request a call
            </Link>
          </button>
        </Col>
      </Row>
    </Container>
   </div>

{/* --------------  main navigation ---------------- */}
     <div className="main_navbar">
      <Container>
        <div className="navigation_wrapper d-flex align-items-center justify-content-between">
          <span className="mobile_menu">
          <i class="ri-menu-line" onClick={toggleMenu}></i>
          </span>

          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <div className="menu">
              {navLinks.map((item,index)=>(
                  <NavLink to={item.path} className={navClass=> navClass.isActive ? 'nav_active nav_item': 'nav_item'} key={index} >{item.display}</NavLink>
                ))}
                {user?.fullName ? (
                 <>
                  <NavLink to='/login' className={navClass=> navClass.isActive ? 'nav_active nav_item loginAndSignupBtn': 'nav_item loginAndSignupBtn'} >{user.fullName}</NavLink>
                  <NavLink to='/signup'  onClick={userLogout} className={navClass=> navClass.isActive ? 'nav_active nav_item loginAndSignupBtn': 'nav_item loginAndSignupBtn'} >Logout</NavLink>  
                 </>
                ): (
                 <>
                  <NavLink to='/login' className={navClass=> navClass.isActive ? 'nav_active nav_item loginAndSignupBtn': 'nav_item loginAndSignupBtn'} >Login</NavLink>
                  <NavLink to='/signup' className={navClass=> navClass.isActive ? 'nav_active nav_item loginAndSignupBtn': 'nav_item loginAndSignupBtn'} >Signup</NavLink>  
                 </>
                  )}
            </div>
          </div>

          <div className="nav_right">
            <div className="search_box">
              <input type="text" placeholder='Search'/>
              <span><i class="ri-search-line"></i></span>
            </div>
          </div>

        </div>
      </Container>
     </div>



  </header>
}

export default Header;
