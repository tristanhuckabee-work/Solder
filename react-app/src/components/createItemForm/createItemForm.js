import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink, useHistory } from 'react-router-dom';

import './ItemForm.css';
import { newItem } from '../../store/item';
import '../auth/textAreaScroll.css'

const CreateItemForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user)
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState();
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState();


  const onSubmit = async (e) => {
    e.preventDefault()

    const item = {
      owner_id: user.id,
      name,
      description,
      price,
      // pics
    }

    const newest = await dispatch(newItem(item));
    if (newest?.errors) setErrors(newest);
    history.push('/');
  }
  const updateName = (e) => setName(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updatePrice = (e) => setPrice(e.target.value);

  if (!user) return <Redirect to='/' />

  return (
    <form onSubmit={onSubmit}>
      <h2>Post Your Item</h2>
      <div className='errors'>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <input
          type='text'
          name='name'
          onChange={updateName}
          value={name}
          placeholder='Item Name'
        ></input>
      </div>
      <div>
        <textarea
          name='description'
          onChange={updateDescription}
          value={description}
          placeholder='Describe your Item here!'
        ></textarea>
      </div>
      <div>
        <input
          type='text'
          name='price'
          onChange={updatePrice}
          value={price}
          placeholder='Price <<$##.##>>'
        ></input>
      </div>
      <button type='submit'>Sign Up</button>
    </form>
  )
}

export default CreateItemForm;