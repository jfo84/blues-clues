import React from 'react';
import registerServiceWorker from './registerServiceWorker';
import thunk from 'redux-thunk';

import { hydrate } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { MuiThemeProvider } from 'material-ui/styles';
import { createMuiTheme } from 'material-ui/styles';
import blue from 'material-ui/colors/blue';

import App from '../shared/App';
import reducer from '../shared/reducers/app';

const theme = createMuiTheme({
  palette: {
    primary: blue
  }
});

// // Grab the state from a global variable injected into the server-generated HTML
// const preloadedState = window.__PRELOADED_STATE__;
// ​
// // Allow the passed state to be garbage-collected
// delete window.__PRELOADED_STATE__;

export const store = createStore(
  reducer,
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
