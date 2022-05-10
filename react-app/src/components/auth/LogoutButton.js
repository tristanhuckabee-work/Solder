import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return <i className="logout fas fa-right-from-bracket fa-2x" onClick={onLogout} />
};

export default LogoutButton;
