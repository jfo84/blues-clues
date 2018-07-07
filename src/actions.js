import axios from 'axios';
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
      inProgress: true
    }
  };
};

// Normally only fetchAuth would be exported but since receiveAuth is handled
// in AuthSuccess after redirect from Spotify this is also exported
export const receiveAuth = (token, error) => {
  return {
    type: actionTypes.RECEIVE_AUTH,
    payload: {
      hasAuthenticated: true,
      inProgress: false,
      token,
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
      redirect_uri: 'http://localhost:3000/auth_callback', 
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
      fetching: true
    }
  };
};

const receiveTracks = (response) => {
  return {
    type: actionTypes.RECEIVE_TRACKS,
    payload: {
      fetching: false,
      items: response.data.items
    }
  };
};

export const fetchTracks = () => {
  return (dispatch, getState) => {
    dispatch(requestTracks());

    const { auth } = getState();
    const authToken = auth.token;

    const options = {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    };

    return axios.get(TRACKS_URL, options).then((response) => {
      dispatch(receiveTracks(response))
    });
  }
};

export const selectTracks = (selected) => {
  return {
    type: actionTypes.SELECT_TRACKS,
    payload: {
      selected
    }
  };
};

const requestRecommendations = () => {
  return {
    type: actionTypes.REQUEST_RECOMMENDATIONS,
    payload: {
      fetching: true
    }
  };
};

const receiveRecommendations = (response) => {
  return {
    type: actionTypes.RECEIVE_RECOMMENDATIONS,
    payload: {
      fetching: false,
      items: response.data.tracks
    }
  };
};

export const fetchRecommendations = () => {
  return (dispatch, getState) => {
    dispatch(requestRecommendations());

    const { auth, tracks } = getState();
    const authToken = auth.token;
    const selectedTracks = tracks.selected;

    const joinedIds = selectedTracks.join(',');
    const params = { seed_tracks: joinedIds };

    const options = {
      params,
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    };

    return axios.get(RECS_URL, options).then((response) => {
      dispatch(receiveRecommendations(response))
    });
  }
};