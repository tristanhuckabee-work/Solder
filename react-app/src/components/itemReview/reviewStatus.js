import React, { useEffect, useState } from 'react';
import './reviews.css';

const ReviewStatus = ({ reviews, reviewState }) => {
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

  useEffect(() => {
    setAvg(getAverageRating());
  }, [reviewState])

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