const CREATE = 'CREATE_REVIEW'
const REVIEWS= 'GET_ITEM_REVIEWS'
const UPDATE = 'UPDATE_REVIEW'
const DELETE = 'DELETE_REVIEW'

const createReview = payload => ({ type: CREATE, payload})
const getAllReviews= payload => ({ type: REVIEWS, payload})
const updateReview = payload => ({ type: UPDATE, payload})
const deleteReview = payload => ({ type: DELETE, payload})

export const newReview  = review => async dispatch => {}
export const getReviews = item_id => async dispatch => {
  const res = await fetch(`/api/reviews/${item_id}`);
  const data= await res.json();

  dispatch( getAllReviews( data ) );
}
export const editReview = review => async dispatch => {}
export const delReview  = review => async dispatch => {}

const initialState = {};
const ReviewReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case CREATE:
      return newState = {...state, action:'CREATE'};
    case REVIEWS:
      newState = {...action.payload};
      action.payload.reviews.forEach(review => {
        newState[review.id] = review
      });
      
      return newState;
    case UPDATE:
      return newState = {...state, action:'UPDATE'};
    case DELETE:
      return newState = {...state, action:'DELETE'};
    default:
      return state;
  }
}

export default ReviewReducer;

