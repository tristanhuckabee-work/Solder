import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { editReview } from '../../store/review';

import './reviews.css';

const EditModal = ({ review }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user);
  const [content, setContent] = useState(review?.content);
  const [userRating, setUserRating] = useState(review?.rating)
  const [open, setOpen] = useState(false);

  const toggleModal = () => setOpen(!open);
  const updateRating = (e) => setUserRating(Number(e.target.id));
  const updateContent = (e) => setContent(e.target.value);
  const showUserStars = () => {
    const blankStars = 5 - userRating;
    if (userRating) {
      return (
        <div className='userStars'>
          {[...Array(userRating)].map((e, i) => {
            return (
              <i key={i} className='fas fa-star fill' id={i + 1} onClick={updateRating}></i>
            )
          })}
          {[...Array(blankStars)].map((e, i) => {
            return (
              <i key={i} className='fas fa-star blank' id={userRating + (i + 1)} onClick={updateRating}></i>
            )
          })}
        </div>
      )
    }
  };
  const update = async (e) => {
    e.preventDefault()

    const updated = {
      id: review.id,
      item_id: review.item.id,
      user_id: user.id,
      rating: userRating,
      content
    }

    await dispatch(editReview(updated));
    toggleModal();
  }


  return (
    <>
      <i className='fas fa-square-pen' onClick={toggleModal} />
      <Popup open={open} modal>
        <form className='edit-modal' onSubmit={update}>
          <h2>Edit your Review</h2>
          <div className='review-input'>
            <input
              name='content'
              type='text'
              placeholder={`${user?.firstName} thinks...`}
              value={content}
              onChange={updateContent}
            />
            {showUserStars()}
          </div>
          <button onClick={update}>Submit</button>
        </form>
      </Popup>
    </>


  )
}

export default EditModal;