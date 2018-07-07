import * as actionTypes from '.././actionTypes';

const initialState = {
  fetching: false,
  items: [],
};

const reducer = (state = initialState, action) => {
  const payload = action.payload;

  switch(action.type) {
    case(actionTypes.REQUEST_RECOMMENDATIONS):
      return {
        ...state,
        ...payload
      };
    case(actionTypes.RECEIVE_RECOMMENDATIONS):
      return {
        ...state,
        ...payload
      };
    default:
      return state;
  }
}

export default reducer;