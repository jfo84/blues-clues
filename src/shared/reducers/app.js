import * as actionTypes from '.././actionTypes';

const initialState = {
  hasAuthenticated: false,
  isAuthenticating: false,
  fetchingTracks: false,
  fetchingRecommendations: false,
  tracks: [],
  selectedTracks: [],
  recommendations: [],
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