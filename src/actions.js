import queryString from 'query-string';

import * as actionTypes from './actionTypes';

const clientId = '2658c55e1c16476a8136334d197ddfc6';

const AUTH_URL = 'https://accounts.spotify.com/authorize';
const TRACKS_URL = 'https://api.spotify.com/v1/me/top/tracks';
const RECS_URL = 'https://api.spotify.com/v1/recommendations';

const requestAuth = () => {
  return {
    type: actionTypes.REQUEST_AUTH,
    payload: {
      hasAuthenticated: false,
      isAuthenticating: true
    }
  };
};

// Normally only fetchAuth would be exported but since receiveAuth is handled
// in AuthSuccess after redirect from Spotify this is also exported
export const receiveAuth = (authToken, error) => {
  return {
    type: actionTypes.RECEIVE_AUTH,
    payload: {
      hasAuthenticated: true,
      isAuthenticating: false,
      authToken,
      error
    }
  };
};

export const fetchAuth = () => {
  return (dispatch) => {
    dispatch(requestAuth());

    const params = { 
      client_id: clientId, 
      response_type: 'token', 
      redirect_uri: 'http://localhost:3000/auth_success/', 
      scope: 'user-top-read'
    };
    const url = `${AUTH_URL}?${queryString.stringify(params)}`;

    window.location.href = url;
    // Could dispatch another action here but the UI doesn't need to
    // know anything while at the Spotify auth URL
    // AuthSuccess instead receives the redirect query params after which
    // an action is dispatched and state changed
  }
};

const requestTracks = () => {
  return {
    type: actionTypes.REQUEST_TRACKS,
    payload: {
      isFetching: true
    }
  };
};

const receiveTracks = (response) => {
  return {
    type: actionTypes.RECEIVE_TRACKS,
    payload: {
      isFetching: false,
      tracks: response['items']
    }
  };
};

export const fetchTracks = () => {
  return (dispatch, getState) => {
    dispatch(requestTracks());

    const { authToken } = getState();
    const options = {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    };

    return fetch(TRACKS_URL, options).then((response) => {
      return response.json();
    }).then((responseJson) => {
      dispatch(receiveTracks(responseJson))
    });
  }
};

const requestRecs = () => {
  return {
    type: actionTypes.REQUEST_RECS,
    payload: {
      isFetching: true
    }
  };
};

const receiveRecs = (response) => {
  return {
    type: actionTypes.RECEIVE_RECS,
    payload: {
      isFetching: false,
      response
    }
  };
};

export const fetchRecs = (trackIds) => {
  return (dispatch, getState) => {
    dispatch(requestRecs());

    const joinedIds = trackIds.join(',');
    const params = JSON.stringify({ seed_tracks: joinedIds });
    const url = `${RECS_URL}?${queryString.stringify(params)}`;

    const { authToken } = getState();
    const options = {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    };

    return fetch(url, options).then((response) => {
      return response.json();
    }).then((responseJson) => {
      dispatch(receiveRecs(responseJson))
    });
  }
};