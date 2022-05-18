import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ReviewForm from './reviewForm';
import EditModal from './editModal.js';
import DeleteModal from './deleteModal.js';
import ReviewStatus from './reviewStatus';
import './reviews.css';

const Reviews = ({ item }) => {
  const user = useSelector(state => state.session.user);
  const reviewState = useSelector(state => state.reviews);
  const reviews = useSelector(state => state.reviews.reviews);

  const [fluff, setFluff] = useState(false);

  useEffect(() => {
    setFluff(!fluff);
  }, [reviewState])

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
      <ReviewStatus
        reviews={reviews}
        reviewState={reviewState}
      />
      <ReviewForm item={item}/>
      <div className='reviews-container'>
        {reviews?.map(review => {
          const poster = review?.user;
          const rt = review?.updated_at.split(' ');
          const displayTime = `${rt[2]} ${rt[1]} ${rt[3]}`

          return (
            <div className='review' key={review?.id}>
              <div className='review-opts'>
                <div
                  className='review-user-pic'
                  style={{ backgroundImage: `url(${poster?.profilePic})` }}
                ></div>
                {poster?.id === user?.id && (
                  <div className='review-user-opts'>
                    <DeleteModal review={review} />
                    <EditModal review={review} />
                  </div>
                )}
              </div>
              <div className='review-contents'>
                <div className='review-head'>
                  <h4>{poster?.firstName} {poster?.lastName}</h4>
                  <p>{ showStars(review?.rating) }</p>
                </div>
                <p>{review?.content}</p>
                <p className='small'>{displayTime}</p>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Reviews;