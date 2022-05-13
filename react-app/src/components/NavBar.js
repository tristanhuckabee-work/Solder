import React, { useEffect, useState } from 'react';
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
  const user = useSelector(state => state.session.user);
  const items = useSelector(state => state.items.items);

  const [searchQuery, setSearchQuery] = useState('');
  const [matched, setMatched] = useState('');

  useEffect(() => {
    let temp = items.map(item => {
      if (item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return ({ name: item.name, id: item.id });
      }
    })
    setMatched(temp);
  }, [setMatched, searchQuery])

  const demoUser = async e => {
    e.preventDefault();
    await dispatch(login('demo@aa.io', 'password'));
    history.push('/');
  }

  const handleSearch = (e) => {
    const id = e.target.innerText.split('#')[1];
    history.push(`/items/${id}`);
  }

  const getSearchValue = () => {
    if (searchQuery !== '') {
      return (
        <>
          {matched?.map(match => {
            return (
              <div
                className='search-match'
                key={match?.id}
                onClick={handleSearch}
              >
                {match?.name}
                {`#${match?.id}`}
              </div>
            )
          })}
        </>
      );
    }
    return (
        <p>No Results Found</p>
      )
    }
    const updateQuery = (e) => {
      setSearchQuery(e.target.value);
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
              <button onClick={demoUser} className='login'>Demo</button>
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
          <Popup
            trigger={
              <div className='search'>
                <i className='fas fa-magnifying-glass' />
                <input
                  type='text'
                  placeholder='Looking for Something?'
                  value={searchQuery}
                  onChange={updateQuery}
                />
              </div>
            }
          >
            <div className='search-modal'>
              {getSearchValue()}
            </div>
          </Popup>
        </header>
      );
    } else {
      return (
        <header>
          <div>
            <NavLink to='/' exact={true}
              activeClassName='active'
              style={{ paddingRight: '15px' }}
            >
              Solder
            </NavLink>
            <div className='search'>
              <i className='fas fa-magnifying-glass' />
              <input type='text' placeholder='Looking for Something?' />
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
