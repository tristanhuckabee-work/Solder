import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const history = useHistory();
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    history.push('/');
  };

  return (
    <div className='logout' onClick={onLogout}>
      <i className="fas fa-right-from-bracket fa-2x" />
      Log Out
    </div>
  )
};

export default LogoutButton;
