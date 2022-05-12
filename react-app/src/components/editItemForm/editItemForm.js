import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory, useLocation } from 'react-router-dom';

import '../createItemForm/ItemForm.css';
import { editItem } from '../../store/item';

const EditItemForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const item = location.state;
  console.log('ITEM:', item)
  const user = useSelector(state => state.session.user)
  const defaultImage = 'https://res.cloudinary.com/dzsgront4/image/upload/v1649267068/14efbdc4406830899f2620ebc9520789_tx5voz.jpg'

  const [errors, setErrors] = useState([]);
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const [price, setPrice] = useState(item.price);
  const [pics, setPics] = useState(item.pics.join(','));
  const [focusedImage, setFocusedImage] = useState(defaultImage)

  const onSubmit = async (e) => {
    e.preventDefault()
    const editedItem = {
      id: item.id,
      name,
      description,
      price,
      pics: pics || defaultImage
    }

    const edited = await dispatch(editItem(editedItem));
    console.log('EDITED:', edited);
    if (edited?.errors) {
      setErrors(edited.errors);
    } else {
      edited.pics = edited.pics.split(',')
      history.push({
        pathname: `/items/${edited.id}`,
        state: edited
      });
    }
  }

  const updateName = (e) => setName(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updatePrice = (e) => setPrice(e.target.value);
  const updateImages = async (e) => {
    e.preventDefault();

    let images = { ...e.target.files };
    let pictures = `${pics?.slice()}`;
    for (let i = 0; i < Object.keys(images).length; i++) {
      const formData = new FormData()
      formData.append('image', images[i])

      const res = await fetch('/api/items/images', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      pictures += `,${data['url']}`;
      pictures = pictures.split(',')
      pictures = pictures[0] === '' ? pictures.slice(1).join(',') : pictures.join(',');
    }
    setPics(pictures);
    setFocusedImage(pictures.split(',')[0]);
  }
  const clearImages = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setPics('')
  }

  const makeFocused = (e) => {
    const backgroundImage = e.target.style.backgroundImage
    const lastQuote = backgroundImage.lastIndexOf('"')
    const payload = backgroundImage.slice(5, lastQuote)
    setFocusedImage(payload)
  }

  if (!user) return <Redirect to='/' />

  return (
    <div className='item-page'>
      <div className='item-page-images-review'>
        <div className='item-page-image-grid'>
          <div className='images-on-deck'>
            {pics?.split(',').map(picture => {
              if (picture === '') {
                return null;
              } else {
                return (
                  <div
                    key={picture}
                    style={{ backgroundImage: `url(${picture})` }}
                    className='item-page-image'
                    onClick={makeFocused}
                  ></div>
                )
              }
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
      <form onSubmit={onSubmit}>
        <h2>Edit Your Item</h2>
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
        <button onClick={clearImages}>Clear Images</button>
        <div>
          <input
            type='file'
            accept='image/*'
            onChange={updateImages}
            multiple
          />
        </div>
        <button type='submit'>Create Item</button>
      </form>
    </div>
  )
}

export default EditItemForm;