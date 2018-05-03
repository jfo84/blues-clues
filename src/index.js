import React from 'react';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import thunk from 'redux-thunk';

import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { cyan500 } from 'material-ui/styles/colors';

import App from './App';
import reducer from './reducer';

const muiTheme = getMuiTheme({
  palette: {
    textColor: cyan500
  },
  appBar: {
    height: 50
  }
});

export const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

export default render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Provider store={store}>
      <App/>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);

registerServiceWorker();
