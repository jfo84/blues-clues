import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import TrackTable from './TrackTable';
import RecommendationList from './RecommendationList';

const PrivateRoute = ({ component: Component, hasAuthenticated, ...rest }) => (
  <Route {...rest} render={(props) => (
    hasAuthenticated === true
      ? <Component {...props} />
      : <Redirect to='/api/login' />
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