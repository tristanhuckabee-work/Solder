import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { delItem } from '../../store/item';
import { addToCart, changeItemCount } from '../../store/cart';
import { getReviews } from '../../store/review';
import Reviews from '../itemReview/reviews';
import Popup from 'reactjs-popup';
import './ItemPage.css';

const ItemPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation()
  const user = useSelector(state => state.session.user);
  const cart = useSelector(state => state.cart);
  const IIC = cart.items;
  const item_id = window.location.pathname.split('/')[2];
  const item = useSelector(state => state.items[item_id]);
  const seller = item?.seller;

  if ( !seller ) history.push('/');

  const [focusedImage, setFocusedImage] = useState(item?.pics[0]);
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(getReviews(item_id))
    })()
  }, [dispatch, item_id])
  useEffect(() => {
    setFocusedImage(item?.pics[0]);
  }, [location])
  const checkIfInCart = () => {
    const ids = IIC?.map(item => item.item_id)
    return ids?.includes(item?.id)
  }

  const makeFocused = (e) => {
    const backgroundImage = e.target.style.backgroundImage
    const lastQuote = backgroundImage.lastIndexOf('"')
    const payload = backgroundImage.slice(5, lastQuote)
    setFocusedImage(payload)
  }
  const deleteItem = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    await dispatch(delItem(item.id))
    history.push('/')
  }
  const updateItem = () => {
    history.push({
      pathname: `/items/${item.id}/edit`,
      state: item
    });
  }
  const addItem = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const ToAdd = {
      item_id: item.id,
      cart_id: cart.id,
      count: 1
    }

    await dispatch(addToCart(ToAdd));
  }
  const removeItem = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const ToRemove = {
      item_id: item.id,
      cart_id: cart.id,
      count: 0
    }

    await dispatch(changeItemCount(ToRemove));
  }

  useEffect(() => {
    setFocusedImage(item?.pics[0])
    setInCart(checkIfInCart);
  }, [cart])


  return (
    <div className='item-page'>
      <div className='item-page-images-review'>
        <div className='item-page-image-grid'>
          <div className='images-on-deck'>
            {item?.pics.map((pic, idx) => {
              return (
                <div
                  key={idx}
                  style={{ backgroundImage: `url(${pic})` }}
                  className='item-page-image'
                  onClick={makeFocused}
                ></div>
              )
            })}
          </div>
          <div className='item-page-focused-image'>
            <div
              style={{ backgroundImage: `url(${focusedImage})` }}
              className='focused'
            >
            </div>
          </div>
        </div>
      </div>

      <div className='item-page-info'>
        <div className='item-page-user-info'>
          <div>
            <div className='seller-pic'
              style={{ backgroundImage: `url(${seller?.profilePic})` }}
            ></div>
            <h3>{seller?.firstName} {seller?.lastName}</h3>
          </div>
          {user && (
            <>
              {seller?.id === user?.id && (
                <div className='seller-options'>
                  <Popup
                    trigger={<button className='item-delete'>Delete</button>}
                    modal
                  >
                    <div className='delete-confirm'>
                      <p>Are You Sure?</p>
                      <button onClick={deleteItem}>YES</button>
                    </div>
                  </Popup>
                  <button
                    className='item-edit'
                    onClick={updateItem}
                  >EDIT</button>
                </div>
              )}
            </>
          )}
        </div>
        <div className='item-page-item-info'>
          <h2>{item?.name}</h2>
          <h3>{item?.price}</h3>
          {user && (
            <>
              {seller?.id !== user?.id && (
                <>
                  {inCart && (
                    <button className='cart-add' onClick={removeItem}>Remove from Cart</button>
                  )}
                  {!inCart && (
                    <button className='cart-add' onClick={addItem}>Add to Cart</button>
                  )}
                </>
              )}
            </>
          )}
          <p>{item?.description}</p>
        </div>
      </div>

      <div className='item-page-reviews'>
        <Reviews item={item} />
      </div>
    </div>
  )
}

export default ItemPage;