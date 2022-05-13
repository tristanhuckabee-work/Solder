import React from 'react';
import Popup from 'reactjs-popup';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { login } from '../store/session';

import LogoutButton from './auth/LogoutButton';
import LoginForm from './auth/LoginForm';
import SignUpForm from './auth/SignUpForm';

import './NavBar.css'

const NavBar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)

  const demoUser = async e => {
    e.preventDefault();
    await dispatch(login('demo@aa.io', 'password'));
    history.push('/');
  }

  if (user === null) {
    return (
      <header>
        <div>
          <NavLink
            to='/'
            exact={true}
            activeClassName='active'
          >
            SOLDER
          </NavLink>
          <div className='login-signup'>
            <button onClick={demoUser}>Demo</button>
            <Popup
              trigger={<button className='login'> Login </button>}
              modal
            >
              <LoginForm />
            </Popup>
            <Popup
              trigger={<button className='signup'> Signup </button>}
              modal
            >
              <SignUpForm />
            </Popup>
          </div>
        </div>
        <div className='search'>
          <i className='fas fa-magnifying-glass' />
          Searchbar Goes Here
        </div>
      </header>
    );
  } else {
    return (
      <header>
        <div>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
          <div className='search'>
            SearchBar Goes Here
          </div>
          <div className='options'>
            <Popup
              trigger={
                <div
                  to='/'
                  exact={true}
                  activeClassName='active'
                  className='userLink'
                  style={{ backgroundImage: `url(${user.profilePic})` }}
                />
              }
              position='bottom center'
            >
              <div className='user-link-options'>
                <p>{user?.firstName} {user?.lastName}</p>
                <LogoutButton />
              </div>
            </Popup>
            <NavLink
              to='/cart'
              exact={true}
              activeClassName='active'
            >
              <i class="fas fa-cart-shopping fa-2x"></i>
            </NavLink>
          </div>
        </div>
      </header>
    );
  }
}

export default NavBar;
