
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { login } from '../store/session';

import LogoutButton from './auth/LogoutButton';

import './NavBar.css'

const NavBar = () => {
  const dispatch = useDispatch();
  const user = useSelector( state => state.session.user )

  const demoUser = async e => {
    e.preventDefault();
    return await dispatch(login('demo@aa.io', 'password'))
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
            <NavLink
              to='/'
              exact={true}
              activeClassName='active'
              className='login'
              onClick={demoUser}
            >
              Demo
            </NavLink>
            <NavLink
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
            </NavLink>
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
