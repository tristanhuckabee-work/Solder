import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Popup from 'reactjs-popup';
import { delReview} from '../../store/review';

import './reviews.css';

const DeleteModal = ({ review }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const toggleModal = () => setOpen(!open);
  const confirm = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    await dispatch( delReview(review.id) );
  }

  return (
    <>
      <i className='fas fa-trash' onClick={toggleModal} />
      <Popup open={open} modal>
        <div className='review-delete-confirm'>
          <p>Are You Sure?</p>
          <button onClick={confirm}>YES</button>
        </div>
      </Popup>
    </>
  )
}

export default DeleteModal;