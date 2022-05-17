import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { newReview } from '../../store/review';

import './reviews.css';

const Reviews = ({ item }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const reviewState = useSelector(state => state.reviews);
  const reviews = useSelector(state => state.reviews.reviews)

  const [avg, setAvg] = useState();
  const [errors, setErrors] = useState([]);
  const [content, setContent] = useState();
  const [userRating, setUserRating] = useState(5);

  const getAverageRating = () => {
    if (reviews?.length) {
      return Math.round(reviews.reduce((accum, review) => {
        return accum += review.rating;
      }, 0) / reviews?.length);
    } else {
      return 0;
    }
  }
  useEffect(() => {
    setAvg(getAverageRating());
  }, [reviewState])
  const updateContent = (e) => setContent(e.target.value);
  const updateRating = (e) => setUserRating(Number(e.target.id));
  const showStars = (rating) => {
    const blankStars = 5 - rating;
    if (rating) {
      return (
        <>
          {[...Array(rating)].map((e, i) => {
            return (
              <i key={i} className='fas fa-star  fill'></i>
            )
          })}
          {[...Array(blankStars)].map((e, i) => {
            return (
              <i key={i} className='fas fa-star  blank'></i>
            )
          })}
        </>
      )
    }
  }
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

    const review = {
      item_id: item.id,
      user_id: user.id,
      rating: userRating,
      content
    }

    await dispatch(newReview(review));

    setContent('');
    setUserRating(5);
  }


  return (
    <>
      <div className='review-status'>
        {!reviews?.length && (
          <>
            <h2>This item hasn't been reviewed yet</h2>
            <p>Why don't you be the first?</p>
          </>
        )}
        {reviews?.length === 1 && (
          <div className='review-with-stars'>
            <h2>{reviews?.length} Review</h2>
            <div className='rating'>{showStars(avg)}</div>
          </div>
        )}
        {reviews?.length > 1 && (
          <div className='review-with-stars'>
            <h2>{reviews?.length} Reviews</h2>
            <div className='rating'>{showStars(avg)}</div>
          </div>
        )}
      </div>
      <form className='review-form' onSubmit={addReview}>
        {errors.map((error, i) => (
          <div key={i}>{error}</div>
        ))}
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
        <button onClick={addReview}>Submit</button>
      </form>
      <div className='reviews-container'>
        {reviews?.map(review => {
          const poster = review?.user;
          return (
            <div className='review' key={review?.id}>
              <div className='review-opts'>
                <div
                  className='review-user-pic'
                  style={{ backgroundImage: `url(${poster?.profilePic})` }}
                ></div>
                {poster?.id === user?.id && (
                  <div className='review-user-opts'>
                    <i className='fas fa-trash' />
                    <i className='fas fa-square-pen' />
                  </div>
                )}
              </div>
              <div className='review-contents'>
                <div className='review-head'>
                  <h4>{poster?.firstName} {poster?.lastName}</h4>
                  <p>{showStars(review?.rating)}</p>
                </div>
                <p>{review?.content}</p>
                <p className='small'>{review?.updated_at}</p>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Reviews;