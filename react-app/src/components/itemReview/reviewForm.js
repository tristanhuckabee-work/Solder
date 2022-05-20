import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { newReview } from '../../store/review';
import './reviews.css';

const ReviewForm = ({ item }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);

  const [errors, setErrors] = useState();
  const [content, setContent] = useState('');
  const [userRating, setUserRating] = useState(3);

  const updateContent = (e) => {
    setContent(e.target.value);
    if (content !== '') setErrors('');
  }
  const updateRating = (e) => setUserRating(Number(e.target.id));
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
  }
  const addReview = async (e) => {
    e.preventDefault()

    if (content === '') {
      setErrors('A review must have content...')
    } else {
      const review = {
        item_id: item.id,
        user_id: user.id,
        rating: userRating,
        content
      }

      await dispatch(newReview(review));

      setContent('');
      setUserRating(3);
    }
  }

  return (
    <>
      {user && (
        <form className='review-form' onSubmit={addReview}>
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
          <div className='review-second'>
            { errors && (
              <p>{errors}</p>
            )}
            <button onClick={addReview}>Submit</button>
          </div>
        </form>
      )}
    </>
  )
}

export default ReviewForm;