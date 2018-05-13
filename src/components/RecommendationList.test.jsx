import * as React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import RecommendationList from './RecommendationList';

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
    store = configureStore(initialState);
  });

  it('should fetch and render a dog', async () => {
    httpMock.onGet('https://api.spotify.com/v1/recommendations').reply(200, {
      status: 'success'
    });

    const wrapper = mount(<Provider store={store}><RecommendationList/></Provider>);
    wrapper.find('.recommendation-button').simulate('click');

    await flushAllPromises();
    wrapper.update();

    const recommendationOne = wrapper.find('.recommendation1');
    expect(recommendationOne.exists()).toBe(true);
    expect(recommendationOne.children.first().text()).toBe('foo');

    const recommendationOne = wrapper.find('.recommendation2');
    expect(recommendationOne.exists()).toBe(true);
    expect(recommendationOne.children.first().text()).toBe('bar');
  });
});