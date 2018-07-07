import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import Main from './components/Main';
import Login from './components/Login';
import AuthCallback from './components/AuthCallback';

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
            <PrivateRoute exact path='/' component={Main} hasAuthenticated={this.props.hasAuthenticated}/>
            <Route path='/login' component={Login} />
            <Route path='/auth_callback' component={AuthCallback} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    hasAuthenticated: state.auth.hasAuthenticated
  };
};

export default connect(mapStateToProps, null)(App);