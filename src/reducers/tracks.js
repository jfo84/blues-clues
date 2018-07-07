import * as actionTypes from '.././actionTypes';

const initialState = {
  fetching: false,
  items: [],
  selected: []
};

const reducer = (state = initialState, action) => {
  const payload = action.payload;

  switch(action.type) {
    case(actionTypes.REQUEST_TRACKS):
      return {
        ...state,
        ...payload
      };
    case(actionTypes.RECEIVE_TRACKS):
      return {
        ...state,
        ...payload
      };
    case(actionTypes.SELECT_TRACKS):
      return {
        ...state,
        ...payload
      };
    default:
      return state;
  }
}

export default reducer;