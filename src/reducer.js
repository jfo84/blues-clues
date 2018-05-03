import * as actionTypes from './actionTypes';

const initialState = {
  isFetching: false,
  tracks: [],
  // TODO: Split out what I need from the responses
  response: {}
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
    case(actionTypes.REQUEST_TOP):
      return {
        ...state,
        ...payload
      };
    case(actionTypes.RECEIVE_TOP):
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