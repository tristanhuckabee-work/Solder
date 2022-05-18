import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return (
    <div className='logout' onClick={onLogout}>
      <i className="fas fa-right-from-bracket fa-2x" />
      Log Out
    </div>
  )
};

export default LogoutButton;
