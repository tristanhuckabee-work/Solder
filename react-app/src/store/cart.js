const CREATE = 'cart/ADD_TO_CART'
const ITEMS  = 'cart/GET_CART'
const UPDATE = 'cart/CHANGE_ITEM_COUNT'
const DELETE = 'cart/CLEAR_CART'

const addItem    = payload => ({ type:CREATE, payload})
const getCart    = payload => ({ type:ITEMS, payload})
const updateCart = payload => ({ type:UPDATE, payload})
const clearCart  = payload => ({ type:DELETE, payload})

export const addToCart = payload => async dispatch => {
  console.log('INSIDE ADD:', payload);
  const res = await fetch('/api/cart/new', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {'Content-Type':'application/json'}
  });
  const data = await res.json();

  dispatch( addItem( data ) );
  return data;
}
export const getCartItems = id => async dispatch => {
  const res = await fetch(`/api/cart/${id}`);
  const data = await res.json();

  dispatch( getCart( data ) );
}
export const changeItemCount = id => async dispatch => {}
export const emptyCart = id => async dispatch => {}

const initialState = {  };
const CartReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case CREATE:
      newState = { ...state }
      console.log('CREATE STATE:', newState)
      console.log('PAYLOAD:', action.payload)
      return newState;
    case ITEMS:
      return newState = { ...state, ...action.payload.cart }
    case UPDATE:
      return state;
    case DELETE:
      return state;
    default:
      return state;
  }
}

export default CartReducer;