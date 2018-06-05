import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Route,
  Switch
} from 'react-router-dom';

import TrackTable from './components/TrackTable';
import RecommendationList from './components/RecommendationList';
import Login from './components/Login';

const PrivateRoute = ({ component: Component, hasAuthenticated, ...rest }) => (
  <Route {...rest} render={(props) => (
    hasAuthenticated === true
      ? <Component {...props} />
      : <Login {...props} />
  )} />
);

class Main extends Component {
  // Remove the server-side injected CSS.
  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    return(
      [
        <TrackTable/>,
        <RecommendationList/>
      ]
    );
  }
}

class App extends Component {
  render() {
    return(
      <div>
        <Switch>
          <PrivateRoute exact path='/' component={Main} hasAuthenticated={this.props.hasAuthenticated} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    hasAuthenticated: state.hasAuthenticated
  };
};

export default connect(mapStateToProps, null)(App);