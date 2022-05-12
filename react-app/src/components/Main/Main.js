import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import ItemCard from '../itemCard/itemCard';
import Popup from 'reactjs-popup';
import SignUpForm from '../auth/SignUpForm';

import { getAllItems } from '../../store/item';

import './Main.css'

const MainSplash = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const items = useSelector(state => state.items.items);

  useEffect(() => {
    dispatch(getAllItems());
  }, [dispatch])

  const createItem = () => history.push('/items/new');

  return (
    <main>
      <div className='splash-create'>
        <h2>Got Something to Sell?</h2>
        {user && (
          <button onClick={createItem}>Sell Now</button>
        ) || (
          <Popup
            trigger={<button> Signup </button>}
            className='signup'
            modal
          >
            <SignUpForm />
          </Popup>
        )
        }
      </div>
      <div className='splash-items'>
        {items.map(item => {
          return (
            <ItemCard
              key={item.id}
              item={item}
            />
          )
        })}
      </div>
    </main>
  )
}

export default MainSplash;