import React, { useEffect, useReducer, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './ItemPage.css';

const ItemPage = () => {
  const item_id = window.location.pathname.split('/')[2];
  const item = useSelector(state => state.items[item_id]);
  const user = useSelector(state => state.session.user);
  
  const [focusedImage, setFocusedImage] = useState(item?.pics[0])

  const makeFocused = (e) => {
    const backgroundImage = e.target.style.backgroundImage
    const lastQuote = backgroundImage.lastIndexOf('"')
    const payload = backgroundImage.slice(5, lastQuote)
    setFocusedImage(payload)
  }

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
          <p>Test User</p>
        </div>
        <div className='item-page-item-info'>
          <h2>{item.name}</h2>
          <h3>{item.price}</h3>
          <button className='cart-add'>Add to Cart</button>
          <p>{item.description}</p>
        </div>
      </div>
    </div>
  )
}

export default ItemPage;