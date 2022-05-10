
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
        <nav>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
          <NavLink to='/' exact={true} activeClassName='active' onClick={demoUser}>
            Demo
          </NavLink>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
          <NavLink to='sign-up' exact={true} activeClassName='active'>
            Sign-up
          </NavLink>
        </nav>
        <div className='search'>
          Searchbar Goes Here
        </div>
      </header>
    );
  } else {
    return (
      <header>
        <nav>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
          <div className='search'>
            SearchBar Goes Here
          </div>
          <LogoutButton />
        </nav>
      </header>
    );
  }
}

export default NavBar;
