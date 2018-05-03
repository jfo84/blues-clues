import * as actionTypes from './actionTypes';

const AUTH_URL = 'https://accounts.spotify.com/authorize';
const REFRESH_AUTH_URL = 'https://accounts.spotify.com/api/token';
const RECOMMENDATIONS_URL = 'https://api.spotify.com/v1/recommendations';

const requestAuth = () => {
  return {
    type: actionTypes.REQUEST_AUTH,
    payload: {
      isFetching: true
    }
  };
};

const receiveAuth = (response) => {
  return {
    type: actionTypes.RECEIVE_AUTH,
    payload: {
      isFetching: false,
      response
    }
  };
};

const failAuth = (response) => {
  return {
    type: actionTypes.FAIL_AUTH,
    payload: {
      isFetching: false,
      response
    }
  };
};

export const fetchAuth = () => {
  return (dispatch) => {
    dispatch(requestAuth());

    const params = Object.assign(BASE_PARAMS, {});
    // TODO: Retrieve client ID from env
    const body = JSON.stringify({ clientId: 'blah', responseType: 'code', redirectUri: 'http://localhost:3000/' });

    return fetch(AUTH_URL, { body }).then((response) => {
      return response.json();
    }).then((responseJson) => {
      // TODO: Something like this
      // if responseJson['status'] === 'success'
      // dispatch(receiveAuth(responseJson))
      // else
      // dispatch(failAuth(responseJson))
    });
  }
}