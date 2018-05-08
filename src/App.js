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

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route {...rest} render={(props) => (
    isAuthenticated === true
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
            <PrivateRoute exact path='/' component={TrackTable} isAuthenticated={this.props.isAuthenticated}/>
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
    isAuthenticated: state.isAuthenticated
  };
};

export default connect(mapStateToProps, null)(App);