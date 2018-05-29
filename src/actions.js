import axios from 'axios';

import * as actionTypes from './actionTypes';

const TRACKS_URL = 'https://api.spotify.com/v1/me/top/tracks';
const RECS_URL = 'https://api.spotify.com/v1/recommendations';

export const fetchAuth = () => {
  return (dispatch) => {
    dispatch(requestAuth());
    dispatch(requestInitialAuth());

    return axios.get('/api/login').then((response) => {
      // TODO: This is hit twice in the flow and shouldn't be
      dispatch(receiveInitialAuth());
    });
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

    return axios.get('/api/callback').then((response) => {
      // TODO: This is hit twice in the flow and shouldn't be
      dispatch(receiveFinalAuth());
    });
  };
};

const requestFinalAuth = () => {
  return {
    type: actionTypes.REQUEST_FINAL_AUTH,
    payload: {}
  };
};

export const receiveFinalAuth = () => {
  return {
    type: actionTypes.RECEIVE_FINAL_AUTH,
    payload: {}
  };
};

export const failAuth = () => {
  return {
    type: actionTypes.FAIL_AUTH,
    payload: {}
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