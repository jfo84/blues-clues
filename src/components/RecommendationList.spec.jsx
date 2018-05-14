import * as React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk'

import RecommendationList from './RecommendationList';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Recommendation request flow', () => {
  let httpMock;
  let store;

  const initialState = {
    recommendations: [],
    selectedTracks: ['1', '2']
  };

  const data = {
    tracks: [
      {
        id: 1,
        name: 'Foo It Up',
        album: {
          name: 'Hoppin Foos All Day',
          images: [
            {
              height: 300,
              url: 'http://foo.com'
            }
          ]
        },
        artists: [
          {
            name: 'Fooby'
          },
          {
            name: 'Barbie'
          }
        ]
      },
      {
        id: 2,
        name: 'Little Foos',
        album: {
          name: 'Hoppin Foos All Day',
          images: [
            {
              height: 300,
              url: 'http://foo.com'
            }
          ]
        },
        artists: [
          {
            name: 'Fooby'
          },
          {
            name: 'Barbie'
          }
        ]
      }
    ]
  };

  const flushAllPromises = () => new Promise(resolve => setImmediate(resolve));

  beforeEach(() => {
    httpMock = new MockAdapter(axios);
    store = mockStore(initialState);
  });

  it('should fetch and render recommendations', async () => {
    httpMock.onGet('https://api.spotify.com/v1/recommendations?seed_tracks=1,2').reply(200, {
      status: 'success',
      data
    });

    const wrapper = mount(<Provider store={store}><RecommendationList/></Provider>);
    wrapper.find('.recommendation-button').simulate('click');

    await flushAllPromises();
    wrapper.update();

    const recommendationOne = wrapper.find('.recommendation1');
    expect(recommendationOne.exists()).toBe(true);
    expect(recommendationOne.children.first().text()).toBe('Foo It Up - Fooby, Barbie');

    const recommendationTwo = wrapper.find('.recommendation2');
    expect(recommendationTwo.exists()).toBe(true);
    expect(recommendationTwo.children.first().text()).toBe('Little Foos - Fooby, Barbie');
  });
});