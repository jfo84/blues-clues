import React from 'react';
import thunk from 'redux-thunk';

import { hydrate } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import blue from 'material-ui/colors/blue';
import grey from 'material-ui/colors/grey';

import App from '../shared/App';
import reducer from '../shared/reducers/app';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    accent: grey,
    type: 'light'
  }
});

export const store = createStore(
  reducer,
  window.__PRELOADED_STATE__,
  applyMiddleware(thunk)
);

export default hydrate(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <Router>
        <App/>
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);

registerServiceWorker();
