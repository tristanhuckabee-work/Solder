import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { delItem } from '../../store/item';
import { addToCart, changeItemCount } from '../../store/cart';

import './page404.css';

const Page404 = () => {
  const history = useHistory();

  const backToSafety = () => {
    history.push('/');
  }
  
  return (
    <div className='error-container'>
      <h1><span className='yellow'>404</span> - Not Found</h1>
      <p>The link <span>{window.location.pathname}</span> has not yet been refurbished</p>
      <p>Try a little shopping while you wait!</p>
      <button onClick={backToSafety}>Click Here to Shop</button>
    </div>
  )
}

export default Page404;