import axios from 'axios';
import queryString from 'query-string';

import * as actionTypes from './actionTypes';

const clientId = '2658c55e1c16476a8136334d197ddfc6';

const AUTH_URL = 'https://accounts.spotify.com/authorize';
const TRACKS_URL = 'https://api.spotify.com/v1/me/top/tracks';
const RECS_URL = 'https://api.spotify.com/v1/recommendations';

export const fetchAuth = () => {
  return (dispatch) => {
    dispatch(requestAuth());
    dispatch(requestInitialAuth());

    window.location.href = '/api/login';
  }
};

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
export const receiveAuth = () => {
  return {
    type: actionTypes.RECEIVE_AUTH,
    payload: {
      hasAuthenticated: true,
      isAuthenticating: false
    }
  };
};

const requestInitialAuth = () => {
  return {
    type: actionTypes.REQUEST_INITIAL_AUTH,
    payload: {}
  };
};

const receiveInitialAuth = () => {
  return {
    type: actionTypes.RECEIVE_INITIAL_AUTH,
    payload: {}
  };
};

export const handleAuthCallback = () => {
  return (dispatch) => {
    dispatch(receiveInitialAuth());
    dispatch(requestFinalAuth());

    window.location.href = '/api/callback';
  };
};

const requestFinalAuth = () => {
  return {
    type: actionTypes.REQUEST_FINAL_AUTH,
    payload: {}
  };
};

export const receiveFinalAuth = () => {
  return (dispatch) => {
    dispatch(receiveFinalAuth());
    dispatch(receiveAuth());


  };
};

const requestTracks = () => {
  return {
    type: actionTypes.REQUEST_TRACKS,
    payload: {
      fetchingTracks: true
    }
  };
};

const receiveTracks = (response) => {
  return {
    type: actionTypes.RECEIVE_TRACKS,
    payload: {
      fetchingTracks: false,
      tracks: response.data.items
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

    return axios.get(TRACKS_URL, options).then((response) => {
      dispatch(receiveTracks(response))
    });
  }
};

const requestRecommendations = () => {
  return {
    type: actionTypes.REQUEST_RECOMMENDATIONS,
    payload: {
      fetchingRecommendations: true
    }
  };
};

const receiveRecommendations = (response) => {
  return {
    type: actionTypes.RECEIVE_RECOMMENDATIONS,
    payload: {
      fetchingRecommendations: false,
      recommendations: response.data.tracks
    }
  };
};

export const fetchRecommendations = () => {
  return (dispatch, getState) => {
    dispatch(requestRecommendations());

    const { authToken, selectedTracks } = getState();

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

export const selectTracks = (selectedTracks) => {
  return {
    type: actionTypes.SELECT_TRACKS,
    payload: {
      selectedTracks
    }
  };
};