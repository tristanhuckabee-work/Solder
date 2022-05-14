import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './cart.css'

const CartPage = () => {
  const items = useSelector(state => state.items);
  const cart = useSelector(state => state.cart);
  const IIC = cart.items;

  const getTotal = () => {
    return 'testing ;p'
  }
  const handleClear = () => {
    console.log('Cart Clear Clicked');
  }
  const handleCheckout = () => {
    console.log('Checkout Clicked');
  }

  return (
    <div className='cart-wrapper'>
      <div className='cart-container'>
        <h2>Your Cart</h2>
        <div className='cart-items'>
          {IIC?.map(item => {
            return (
              <div>
                {item?.name}
                {item?.price}
                {item?.count}
              </div>
            )
          })}
          <button onClick={handleClear}>Clear Cart</button>
        </div>
        <div className='cart-checkout'>
          <h3>{`Total: ${getTotal()}`}</h3>
          <button onClick={handleCheckout}>Checkout</button>
        </div>
      </div>
      <div className='cart-container checkout-confirm'>
        <h3 className='action-res'>Test</h3>
      </div>
    </div>
  )
}

export default CartPage;