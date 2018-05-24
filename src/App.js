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
import Auth from './components/Auth';

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
            <Route path='/auth' component={Auth} />
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