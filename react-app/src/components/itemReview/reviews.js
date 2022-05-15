import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { delItem } from '../../store/item';
import { addToCart, changeItemCount } from '../../store/cart';
import { getReviews } from '../../store/review';

import './reviews.css';

const Reviews = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const reviews = useSelector(state => state.reviews.reviews)

  const [avg, setAvg] = useState();

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
  }, [reviews])

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
    </>
  )
}

export default Reviews;