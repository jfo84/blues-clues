import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';

import Login from './components/Login';
import TrackTable from './components/TrackTable';
import AuthSuccess from './components/AuthSuccess';

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
          <PrivateRoute exact path='/' component={TrackTable} />
          <Route path='/auth_success' component={AuthSuccess} />
          <Route path='/login' component={Login} isAuthenticated={this.props.isAuthenticated} />
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