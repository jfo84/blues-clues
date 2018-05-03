import React, { Component } from 'react';
import { 
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import Login from './components/Login';
import TrackTable from './components/TrackTable';

class App extends Component {
  render() {
    return(
      <Router>
        <div>
          <Route exact path="/" component={Login} />
          <Route path="/tracks" component={TrackTable} />
        </div>
      </Router>
    );
  }
}

export default App;