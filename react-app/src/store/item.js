const CREATE = 'items/new'
const ITEMS  = 'items'
const UPDATE = 'items/update'
const DELETE = 'items/delete'

const createItem = payload => { type: CREATE, payload}
const getItems   = payload => { type: CREATE, payload}
const updateItem = payload => { type: CREATE, payload}
const deleteItem = payload => { type: CREATE, payload}

export const newItem = item => async dispatch => {
  return null;
}
export const getAllItems = () => async dispatch => {
  return null;
}
export const editItem = item => async dispatch => {
  return null;
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

    case ITEMS:

    case UPDATE:

    case DELETE:

    default:
      return state;
  }
}

export default ServerReducer;
