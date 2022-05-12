const CREATE = 'items/new'
const ITEMS  = 'items'
const UPDATE = 'items/update'
const DELETE = 'items/delete'

const createItem = payload => ({ type: CREATE, payload})
const getItems   = payload => ({ type: ITEMS, payload})
const updateItem = payload => ({ type: UPDATE, payload})
const deleteItem = payload => ({ type: DELETE, payload})

export const newItem = item => async dispatch => {
  const res = await fetch(`/api/items/new`, {
    method: 'POST',
    body: JSON.stringify(item),
    headers: {'Content-Type':'application/json'}
  });
  const data = await res.json();

  dispatch( createItem( data ) );
  return data;
}
export const getAllItems = () => async dispatch => {
  const res = await fetch('/api/items/');
  const data = await res.json();
  console.log('DATA', data)
  data.items.forEach(item => {
    if ( !Array.isArray(item.pics) ) item.pics = item.pics.split(',')
  });
  dispatch( getItems( data ) );
}
export const editItem = (item) => async dispatch => {
  console.log('INSIDE EDIT:', item);
  const res = await fetch(`/api/items/${item.id}/edit`, {
    method: 'PATCH',
    body: JSON.stringify(item),
    heades: {'Content-Type':'application.json'}
  });
  const data = await res.json();

  dispatch( updateItem( data ) );
  return data;
}
export const delItem = id => async dispatch => {
  return null;
}

// Reducer
const initialState = { items: [] }
const ItemReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case CREATE:
      newState = { ...state };
      console.log('\n\n\n', newState);
      console.log('\n', action.payload)
      return state;
    case ITEMS:
      newState = { ...state, ...action.payload}
      action.payload.items?.forEach(item => {
        newState[item.id] = item
      })
        
      return newState;
    case UPDATE:
      newState ={ ...state }
      console.log('\n\n\n\n', newState)
      console.log('\n', action.payload)
    case DELETE:
      return state;
    default:
      return state;
  }
}

export default ItemReducer;
