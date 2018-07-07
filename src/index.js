import React from 'react';
import registerServiceWorker from './registerServiceWorker';
import thunk from 'redux-thunk';

import { render } from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import { MuiThemeProvider } from 'material-ui/styles';
import { createMuiTheme } from 'material-ui/styles';
import blue from 'material-ui/colors/blue';

import App from './App';

import authReducer from './reducers/auth';
import recommendationsReducer from './reducers/recommendations';
import tracksReducer from './reducers/tracks';

const theme = createMuiTheme({
  palette: {
    primary: blue
  }
});

export const store = createStore(
  combineReducers({
    auth: authReducer,
    recommendations: recommendationsReducer,
    tracks: tracksReducer
  }),
  applyMiddleware(thunk)
);

export default render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <App/>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);

registerServiceWorker();
