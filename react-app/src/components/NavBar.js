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
              trigger={<button> Login </button>}
              className='login'
              modal
            >
              <LoginForm />
            </Popup>
            <Popup
              trigger={<button> Signup </button>}
              className='signup'
              modal
            >
              <SignUpForm />
            </Popup>
            {/* <NavLink
              to='/login'
              exact={true}
              className='login'
              activeClassName='active'
              >
              Login
            </NavLink>
            <NavLink
              to='sign-up'
              exact={true}
              className='signup'
              activeClassName='active'
              >
              Sign-up
            </NavLink> */}
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
            <NavLink
              to='/'
              exact={true}
              activeClassName='active'
              className='userLink'
              style={{ backgroundImage: `url(${user.profilePic})` }}
            />
            <LogoutButton />
          </div>
        </div>
      </header>
    );
  }
}

export default NavBar;
