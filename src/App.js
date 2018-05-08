import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';

import Login from './components/Login';
import TrackTable from './components/TrackTable';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    props.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
);

class App extends Component {
  render() {
    return(
      <Router>
        <div>
          <Route exact path='/' component={TrackTable} />
          <PrivateRoute path='/login' component={Login} isAuthenticated={this.props.isAuthenticated} />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.isAuthenticated
  };
};

export default connect(mapStateToProps, null)(App);