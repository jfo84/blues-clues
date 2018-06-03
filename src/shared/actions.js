import axios from 'axios';

import * as actionTypes from './actionTypes';

const TRACKS_URL = 'https://api.spotify.com/v1/me/top/tracks';
const RECS_URL = 'https://api.spotify.com/v1/recommendations';

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
      params: params,
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
      selectedTracks: selectedTracks
    }
  };
};