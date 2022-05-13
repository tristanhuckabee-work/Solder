import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { delItem } from '../../store/item';

import './ItemPage.css';

const ItemPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const user = useSelector(state => state.session.user)
  const item_id = window.location.pathname.split('/')[2];
  const item = useSelector(state => state.items[item_id]) || location.state;
  if (item.pics === '') item.pics = ['https://res.cloudinary.com/dzsgront4/image/upload/v1649267068/14efbdc4406830899f2620ebc9520789_tx5voz.jpg']

  const [focusedImage, setFocusedImage] = useState(item?.pics[0])

  useEffect(() => {
    setFocusedImage(item?.pics[0])
  }, [item])

  const makeFocused = (e) => {
    const backgroundImage = e.target.style.backgroundImage
    const lastQuote = backgroundImage.lastIndexOf('"')
    const payload = backgroundImage.slice(5, lastQuote)
    setFocusedImage(payload)
  }
  const deleteItem = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    await dispatch( delItem( item.id ) )
    history.push('/')
  }
  const updateItem = () => {
    history.push({
      pathname: `/items/${item.id}/edit`,
      state: item
    });
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
          {item.seller_id === user?.id && (
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
          )
          }
        </div>
        <div className='item-page-item-info'>
          <h2>{item.name}</h2>
          <h3>{item.price}</h3>
          <button className='cart-add'>Add to Cart</button>
          <p>{item.description}</p>
        </div>
      </div>

      <div className='item-page-reviews'>
        <h2>This is where reviews will go once I get to it</h2>
        <p>does this not entertain the box-model gods?</p>
      </div>
    </div>
  )
}

export default ItemPage;