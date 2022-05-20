import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { editItem } from '../../store/item';
import Loader from './loader';
import '../createItemForm/ItemForm.css';

const EditItemForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const item = location.state;
  const user = useSelector(state => state.session.user)
  const defaultImage = 'https://res.cloudinary.com/dta9dkzbk/image/upload/v1653077550/no-image-available_pbgdnv.jpg'

  const [errors, setErrors] = useState([]);
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const [price, setPrice] = useState(item.price.slice(1));
  const [pics, setPics] = useState(item.pics.join(','));
  const [focusedImage, setFocusedImage] = useState(item.pics[0]);
  const [imageLoading, setImageLoading] = useState(false);



  const checkValid = () => {
    let invalid = [];

    if (name === '') invalid.push('Name is Required');
    if (description === '') invalid.push('Description is Required');
    if (price === '') invalid.push('Price is Required');
    if (Number(price) < 0) invalid.push('Price must be Non-Negative');
    if (Number(price) >= 1000.00) invalid.push('Price must be less than 1,000.00');

    setErrors(invalid);
  }
  useEffect(() => {
    checkValid();
  }, [name, description, price])

  const onSubmit = async (e) => {
    e.preventDefault()

    const editedItem = {
      id: item.id,
      name,
      description,
      price: `${Number(price).toFixed(2)}`,
      pics: pics || defaultImage
    }

    const edited = await dispatch(editItem(editedItem));
    const picArr = edited.pics.split(',');
    edited.pics = picArr;
    history.push({
      pathname: `/items/${edited.id}`,
      state: edited
    });
  }

  const updateName = (e) => setName(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updatePrice = (e) => {
    let nonNumber = '';
    let accepted = '0123456789.';
    e.target.value.split('').forEach(char => {
      if (!accepted.includes(char)) {
        if (char === '-') {
          nonNumber = 'b'
        } else {
          nonNumber = 'n'
        }
      }
    });

    let invalid = []
    if (nonNumber === 'n') {
      if (errors.includes('Price must be a number')) {
        return;
      } else {
        invalid.push('Price must be a number')
      }
    } else if (nonNumber === 'b') {
      if (errors.includes('Price must be positive')) {
        return;
      } else {
        invalid.push('Price must be positive')
      }
    } else if (Number(e.target.value) > 999.99) {
      if (errors.includes('Price must be less than 1,000.00')) {
        return;
      } else {
        invalid.push('Price must be less than 1,000.00')
      }
    } else if (nonNumber === '' && e.target.value.length <= 6) {
      setErrors(errors.concat(invalid));
      setPrice(e.target.value);
      return;
    }
    setErrors(errors.concat(invalid));
  }
  const updateImages = async (e) => {
    e.preventDefault();

    setImageLoading(true);
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
    setImageLoading(false);
  }
  const clearImages = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setPics('')
    setFocusedImage('https://res.cloudinary.com/dta9dkzbk/image/upload/v1653065218/images_w381gg.png')
  }

  const makeFocused = (e) => {
    const backgroundImage = e.target.style.backgroundImage
    const lastQuote = backgroundImage.lastIndexOf('"')
    const payload = backgroundImage.slice(5, lastQuote)
    setFocusedImage(payload)
  }

  if (!user) return <Redirect to='/' />

  return (
    <>
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
              placeholder='Price 000.00 - 999.99'
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
          {(
            !errors.length && (
              <button type='submit'>Update Item</button>
            )
          )
            ||
            (
              errors.length && (
                <p className='invalid-form'>Please Correct Errors</p>
              )
            )}
        </form>
      </div>
      {imageLoading && (
        <Loader />
      )}
    </>
  )
}

export default EditItemForm;