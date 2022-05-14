const CREATE = 'cart/new'
const ITEMS  = 'cart'
const UPDATE = 'cart/edit'
const DELETE = 'cart/delete'

const addItem    = payload => ({ type:CREATE, payload})
const getCart    = payload => ({ type:ITEMS, payload})
const updateCart = payload => ({ type:UPDATE, payload})
const clearCart  = payload => ({ type:DELETE, payload})

export const addToCart = payload => async dispatch => {}
export const getCartItems = id => async dispatch => {}
export const changeItemCount = id => async dispatch => {}
export const emptyCart = id => async dispatch => {}

const initialState = {  };
const CartReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case CREATE:
      return state;
    case ITEMS:
      return state;
    case UPDATE:
      return state;
    case DELETE:
      return state;
    default:
      return state;
  }
}

export default CartReducer;