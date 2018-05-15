import * as React from 'react';
import { Provider } from 'react-redux';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import RecommendationList from './RecommendationList';
import reducer from '../reducer';
import { tracks } from '../data';

describe('Recommendation request flow', () => {
  let httpMock;
  let store;

  const initialState = {
    recommendations: [],
    selectedTracks: ['1', '2']
  };

  const flushAllPromises = () => new Promise(resolve => setImmediate(resolve));

  beforeEach(() => {
    httpMock = new MockAdapter(axios);
    store = createStore(
      reducer,
      initialState,
      applyMiddleware(thunk)
    );
  });

  it('should fetch and render recommendations', async () => {
    httpMock.onGet('https://api.spotify.com/v1/recommendations').reply(200, {
      status: 'success',
      tracks
    });

    const wrapper = mount(<Provider store={store}><RecommendationList/></Provider>);
    wrapper.find('button.recommendation-button').simulate('click');

    await flushAllPromises();
    wrapper.update();

    const recommendationOne = wrapper.find('div.recommendation0');
    expect(recommendationOne.exists()).toBe(true);
    expect(recommendationOne.childAt(0).text()).toBe('Foo It Up - Fooby, Barbie');
    expect(recommendationOne.childAt(1).text()).toBe('Hoppin Foos All Day');

    const recommendationTwo = wrapper.find('div.recommendation1');
    expect(recommendationTwo.exists()).toBe(true);
    expect(recommendationTwo.childAt(0).text()).toBe('Little Foos - Fooby, Barbie');
    expect(recommendationTwo.childAt(1).text()).toBe('Hoppin Foos All Day');
  });
});