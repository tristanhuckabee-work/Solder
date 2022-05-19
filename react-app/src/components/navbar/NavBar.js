import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Popup from 'reactjs-popup';
import UserInfo from './userModal';
import About from './about';
import LoginForm from '../auth/LoginForm';
import SignUpForm from '../auth/SignUpForm';
import './NavBar.css'

const NavBar = () => {
  const user = useSelector(state => state.session.user);

  if (user === null) {
    return (
      <header>
        <div>
          <NavLink to='/'>SOLDER</NavLink>
          <div className='login-signup'>
            <About />
            <Popup trigger={<button className='login'> Login </button>} modal><LoginForm /></Popup>
            <Popup trigger={<button className='signup'> Signup </button>} modal><SignUpForm /></Popup>
          </div>
        </div>
      </header>
    );
  } else {
    return (
      <header>
        <div>
          <NavLink to='/' style={{ paddingRight: '15px' }}>Solder</NavLink>
          <div className='options'>
            <About />
            <UserInfo user={user} />
            <NavLink to='/cart'><i className="fas fa-cart-shopping fa-2x"></i></NavLink>
          </div>
        </div>
      </header>
    );
  }
}

export default NavBar;
