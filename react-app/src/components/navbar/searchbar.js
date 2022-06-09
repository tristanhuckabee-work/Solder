import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import Popup from 'reactjs-popup';
import './NavBar.css'

const SearchBar = () => {
  const history = useHistory();
  const items = useSelector( state => state.items.items);
  const [open, setOpen] = useState(false);
  const [val, setValue] = useState('')

  let res = items.filter(item => {
    if (val) {
      if (item.name.toLowerCase().includes(val.toLowerCase())) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  });

  const goToPage = (e) => {
    setValue('');
    setOpen(false);
    history.push({pathname:`/items/${e.target.id}`, state:e.target.id});
  }
  const toggleOpen = () => setOpen(!open);
  const updateVal = (e) => setValue(e.target.value);
  const showResults = () => {
    return (
      <div className='search-res'>
        <p>Results for '<b>{val}</b>'...</p>
        { res.map((item, idx) => (
          <p key={idx} id={item.id} className='search-item' onClick={goToPage}>
            {item.name}
          </p>
        ))}
      </div>
    )
  }

  return (
    <>
      <div className='search-bar'>
        <i className='fas fa-magnifying-glass' />
        <input
          type='text'
          name='searchVal'
          value={val || ''}
          placeholder='Looking for Something?'
          onClick={toggleOpen}
          onChange={updateVal}
        />
      </div>
      <Popup open={open} onClose={() => setValue(false)} modal>
        {showResults}
      </Popup>
    </>
  )
}

export default SearchBar;
