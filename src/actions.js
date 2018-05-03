import * as actionTypes from './actionTypes';

const clientId = '2658c55e1c16476a8136334d197ddfc6';

const AUTH_URL = 'https://accounts.spotify.com/authorize';
const REFRESH_AUTH_URL = 'https://accounts.spotify.com/api/token';
const TOP_URL = 'https://api.spotify.com/v1/me/top/tracks'
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

    const body = JSON.stringify({ 
      clientId, 
      responseType: 'token', 
      redirectUri: 'http://localhost:3000/', 
      scope: 'user-top-read'
    });

    return fetch(AUTH_URL, { body }).then((response) => {
      return response.json();
    }).then((responseJson) => {
      if (responseJson.hasOwnProperty('error')) {
        dispatch(failAuth(responseJson))
      } else {
        dispatch(receiveAuth(responseJson))
      }
    });
  }
}

const requestTop = () => {
  return {
    type: actionTypes.REQUEST_TOP,
    payload: {
      isFetching: true
    }
  };
};

const receiveTop = (response) => {
  return {
    type: actionTypes.RECEIVE_TOP,
    payload: {
      isFetching: false,
      response
    }
  };
};

export const fetchTop = () => {
  return (dispatch) => {
    dispatch(requestTop());

    return fetch(TOP_URL).then((response) => {
      return response.json();
    }).then((responseJson) => {
      dispatch(receieveTop(responseJson))
    });
  }
}

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
  return (dispatch) => {
    dispatch(requestTop());

    joinedIds = trackIds.join(',');
    const body = JSON.stringify({ seedTracks: joinedIds });

    return fetch(TOP_URL, { body }).then((response) => {
      return response.json();
    }).then((responseJson) => {
      dispatch(receieveTop(responseJson))
    });
  }
}