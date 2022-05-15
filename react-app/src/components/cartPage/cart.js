import React/*, { useEffect }*/ from 'react';
import { useSelector/*, useDispatch*/ } from 'react-redux';

import './cart.css'

const CartPage = () => {
  const items = useSelector(state => state.items);
  const cart = useSelector(state => state.cart);
  const IIC = cart.items;

  const getTotal = () => {
    let total = 0;
    IIC?.forEach(item => {
      total += parseFloat( items[item?.item_id]?.price.split('$')[1] )*item.count;
    })
    return `$${total}`;
  }
  // not done
  const changeCount = (e) => {
    const op = e.target.id.split(' ');
    if ( op[0] === 'minus' ) {
      console.log('minus')
    } else {
      console.log('plus')
    }
  }
  const handleClear = () => {
    console.log('Cart Clear Clicked');
  }
  const handleCheckout = () => {
    console.log('Checkout Clicked');
  }

  return (
    <>
      <div className='cart-wrapper'>
        <div className='cart-container'>
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
                    id={`minus ${item.id}`}
                    onClick={changeCount}/>
                  <h3>{item?.count}</h3>
                  <i
                    className='fas fa-plus'
                    id={`plus ${item.id}`}
                    onClick={changeCount}/>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className='summary'>
        <h2>Your Cart</h2>
        <div className='summary-items'>
          {IIC?.map(item => {
              const curr = items[item?.item_id];
              return (
                <div key={curr.id}className='summary-item'>
                  <h3>{curr?.name}</h3>
                  <p>{ `$${Number(curr?.price.split('$')[1])*item.count}` }</p>
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