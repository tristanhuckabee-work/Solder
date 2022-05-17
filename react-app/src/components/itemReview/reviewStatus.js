import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { newReview } from '../../store/review';

import Popup from 'reactjs-popup';
import EditModal from './editModal.js';
import DeleteModal from './deleteModal.js';


import './reviews.css';

const ReviewStatus = ({ reviews }) => {
  const [avg, setAvg] = useState();

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
  )
}

export default ReviewStatus;