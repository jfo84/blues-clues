import * as actionTypes from './actionTypes';

const initialState = {
  isAuthenticated: false,
  isFetching: false,
  tracks: [],
  errorMessage: null,
  accessToken: 'BQDRfcv13TSaPPmVkxI6ufsjo-a_312pKjPCtd8zijuqg1G04sS5yJtdSlWFtCwk-y4bS8d558PSv7OmZ_A_clt4zFVU4VAEUY9ehGyhmIutSowdS5O3vQPcooIfqFdsaeK7yOEpOeVIDEw7eg'
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