import * as React from 'react';
import { Provider } from 'react-redux';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';

import Main from './Main';

import authReducer from '.././reducers/auth';
import playlistsReducer from '.././reducers/playlists';
import recommendationsReducer from '.././reducers/recommendations';
import tracksReducer from '.././reducers/tracks';

import { tracks, recommendations } from '../data';

describe('Recommendation request flow', () => {
  let httpMock;
  let store;

  const initialState = {
    recommendations: {
      fetching: false,
      items: []
    },
    playlists: {
      fetching: false,
      items: []
    },
    tracks: {
      fetching: false,
      items: [],
      selected: ['1', '2']
    }
  };

  const flushAllPromises = () => new Promise(resolve => setImmediate(resolve));

  beforeEach(() => {
    httpMock = new MockAdapter(axios);
    store = createStore(
      combineReducers({
        auth: authReducer,
        playlists: playlistsReducer,
        recommendations: recommendationsReducer,
        tracks: tracksReducer
      }),
      initialState,
      applyMiddleware(thunk)
    );
  });

  it('should fetch and render recommendations', async () => {
    httpMock.onGet('https://api.spotify.com/v1/me/top/tracks').reply(200, {
      status: 'success',
      items: tracks
    });

    httpMock.onGet('https://api.spotify.com/v1/recommendations').reply(200, {
      status: 'success',
      tracks: recommendations
    });

    const wrapper = mount(<Provider store={store}><Main/></Provider>);
    wrapper.find('button.recommendation-button').simulate('click');

    await flushAllPromises();
    wrapper.update();

    const recommendationOne = wrapper.find('div.recommendation0');
    expect(recommendationOne.exists()).toBe(true);
    expect(recommendationOne.childAt(0).text()).toBe('Foo Me Baby One More Time - Fooby, Barbie');
    expect(recommendationOne.childAt(1).text()).toBe('Hoppin Foos All Day');
    expect(recommendationOne.childAt(2).is('img')).toBe(true);

    const recommendationTwo = wrapper.find('div.recommendation1');
    expect(recommendationTwo.exists()).toBe(true);
    expect(recommendationTwo.childAt(0).text()).toBe('Fooey, My One True Love - Fooby, Barbie');
    expect(recommendationTwo.childAt(1).text()).toBe('Hoppin Foos All Day');
    expect(recommendationTwo.childAt(2).is('img')).toBe(true);
  });
});