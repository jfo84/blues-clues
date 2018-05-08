import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import Login from './components/Login';
import TrackTable from './components/TrackTable';
import AuthSuccess from './components/AuthSuccess';

const PrivateRoute = ({ component: Component, hasAuthenticated, ...rest }) => (
  <Route {...rest} render={(props) => (
    hasAuthenticated === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
);

class App extends Component {
  render() {
    return(
      <Router>
        <div>
          <Switch>
            <PrivateRoute exact path='/' component={TrackTable} hasAuthenticated={this.props.hasAuthenticated}/>
            <Route path='/auth_success' component={AuthSuccess} />
            <Route path='/login' component={Login} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    hasAuthenticated: state.hasAuthenticated
  };
};

export default connect(mapStateToProps, null)(App);