import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeItemCount, emptyCart } from '../../store/cart';


import './cart.css'

const CartPage = () => {
  const dispatch = useDispatch();
  const items = useSelector(state => state.items);
  const cart = useSelector(state => state.cart);
  const [IIC, setIIC] = useState(cart?.items);
  const [checkedOut, setCheckedOut] = useState(false);

  useEffect(() => {
    setIIC(cart?.items)
  }, [cart])

  const getTotal = () => {
    let total = 0;
    IIC?.forEach(item => {
      total += parseFloat(items[item?.item_id]?.price.split('$')[1]) * item.count;
    })
    return `$${total}`;
  }
  const changeCount = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const args = e.target.id.split(' ');

    let modified;
      

    if (args[0] === 'minus') {
      modified = {
        item_id: Number(args[2]),
        cart_id: Number(args[1]),
        count:   Number(args[3]) - 1
      }
    } else {
      modified = {
        item_id: Number(args[2]),
        cart_id: Number(args[1]),
        count:   Number(args[3]) + 1
      }
    }
    
    await dispatch( changeItemCount( modified ) );
  }
  const handleClear = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    await dispatch( emptyCart(cart.id) );
  }
  const handleCheckout = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    await dispatch( emptyCart(cart.id) );
    setCheckedOut(true);
  }

  return (
    <>
      <div className='cart-wrapper'>
        <div className='cart-container'>
          {IIC?.length === 0 && (
            <div className='empty'>
              { !checkedOut && (
                "Your Shopping Cart is Empty"
              )}
              { checkedOut && (
                "You've Checked Out"
              )}
            </div>
          )}
          {IIC?.map(item => {
            const curr = items[item?.item_id];
            return (
              <div key={curr.id} className='cart-container-item'>
                <div className='cart-container-item-pic'
                  style={{ backgroundImage: `url(${curr?.pics[0]})` }}
                >
                </div>
                <div className='cart-container-item-info'>
                  <h3>{curr?.name}</h3>
                  {curr?.price}
                </div>
                <div className='cart-container-item-count'>
                  <i
                    className='fas fa-minus'
                    id={`minus ${item.cart_id} ${item.item_id} ${item.count}`}
                    onClick={changeCount} />
                  <h3>{item?.count}</h3>
                  <i
                    className='fas fa-plus'
                    id={`plus ${item.cart_id} ${item.item_id} ${item.count}`}
                    onClick={changeCount} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className='summary'>
        <h2>Your Cart</h2>
        <div className='summary-items'>
          {IIC?.length === 0 && (
            <div className='summary-empty'>
              { !checkedOut && (
                "Your Shopping Cart is Empty"
              )}
              { checkedOut && (
                "You've Checked Out"
              )}
            </div>
          )}
          {IIC?.map(item => {
            const curr = items[item?.item_id];
            return (
              <div key={curr.id} className='summary-item'>
                <h3>{curr?.name}</h3>
                <p>{`$${Number(curr?.price.split('$')[1]) * item.count}`}</p>
              </div>
            )
          })}
        </div>
        <div className='cart-checkout'>
          <h3>{`Total: ${getTotal()}`}</h3>
          <button onClick={handleCheckout}>Checkout</button>
          <button onClick={handleClear}>Clear Cart</button>
        </div>
      </div>
    </>
  )
}

export default CartPage;