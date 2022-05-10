import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ItemCard from '../itemCard/itemCard';

import './Main.css'

const MainSplash = () => {
  const history = useHistory();
  const items = useSelector(state => state.items.items)
  const createItem = () => {
    history.push('/items/new')
  };

  return (
    <main>
      <div className='splash-create'>
        <h2>Got Something to Sell?</h2>
        <button onClick={createItem}>Sell Now</button>
      </div>
      <div className='splash-items'>
        {items.map(item => {
          return (
            <ItemCard key={item.id} item={item}/>
          )
        })}
      </div>
    </main>
  )
}

export default MainSplash;