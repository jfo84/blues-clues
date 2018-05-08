import * as actionTypes from './actionTypes';

const initialState = {
  isAuthenticated: false,
  isFetching: false,
  tracks: [],
  error: null,
  authToken: null
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
    case(actionTypes.FAIL_AUTH):
      return {
        ...state,
        ...payload
      };
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
    case(actionTypes.REQUEST_RECS):
      return {
        ...state,
        ...payload
      };
    case(actionTypes.RECEIVE_RECS):
      return {
        ...state,
        ...payload
      };
    default:
      return state;
  }
}

export default reducer;