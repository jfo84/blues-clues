import * as actionTypes from '.././actionTypes';

const initialState = {
  hasAuthenticated: false,
  inProgress: false,
  error: null,
  token: null
};

const reducer = (state = initialState, action) => {
  const payload = action.payload;

  switch(action.type) {
    case(actionTypes.REQUEST_AUTH):
      return {
        ...state,
        ...payload
      };
    case(actionTypes.RECEIVE_AUTH):
      return {
        ...state,
        ...payload
      };
    default:
      return state;
  }
}

export default reducer;