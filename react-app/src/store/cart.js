const CREATE = 'cart/ADD_TO_CART'
const ITEMS = 'cart/GET_CART'
const UPDATE = 'cart/CHANGE_ITEM_COUNT'
const DELETE = 'cart/CLEAR_CART'

const addItem = payload => ({ type: CREATE, payload })
const getCart = payload => ({ type: ITEMS, payload })
const updateCart = payload => ({ type: UPDATE, payload })
const clearCart = payload => ({ type: DELETE, payload })

export const addToCart = payload => async dispatch => {
  console.log('INSIDE:', payload);
  const res = await fetch('/api/cart/new', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' }
  });
  console.log('INSIDE RES:', res);
  const data = await res.json();
  console.log('INSIDE DATA:', data);

  dispatch(addItem(data));
  return data;
}
export const getCartItems = id => async dispatch => {
  const res = await fetch(`/api/cart/${id}`);
  const data = await res.json();

  dispatch(getCart(data));
}
export const changeItemCount = payload => async dispatch => {
  const res = await fetch('/api/cart/edit', {
    method: 'PATCH',
    body: JSON.stringify(payload),
    header: { 'Content-Type': 'application/json' }
  });
  const data = await res.json();
  await dispatch(updateCart(data));
  return data;
}
export const emptyCart = id => async dispatch => { }

const initialState = {};
const CartReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case CREATE:
      newState = { ...state };
      newState.items.push(action.payload);
      return newState;
    case ITEMS:
      return newState = { ...state, ...action.payload }
    case UPDATE:
      newState = { ...state }
      const payload = action.payload.item;
      const toDelete = action.payload.delete;

      for (let i = 0; i < newState.items.length; i++) {
        let item = newState.items[i];
        if (item.item_id === payload.item_id) {
          if (toDelete) {
            newState.items.splice(i, 1);
            return newState;
          } else {
            item.count = payload.count
            return newState;
          }
        }
      }

    case DELETE:
      return state;
    default:
      return state;
  }
}

export default CartReducer;