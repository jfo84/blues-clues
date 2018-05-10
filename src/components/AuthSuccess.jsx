import React, { Component } from 'react';
import { connect } from 'react-redux';
import { receiveAuth } from '../actions';
import { Redirect, withRouter } from 'react-router-dom';

class AuthSuccess extends Component {
  componentWillMount() {
    const paramsString = this.props.location.hash.substring(1);
    const params = this.parseQuery(paramsString);

    const authToken = params['access_token'];
    const error = params['error'];

    this.props.receiveAuth(authToken, error);
  }

  parseQuery = (queryString) => {
    var query = {};
    var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
  };

  render() {
    const { hasAuthenticated, isAuthenticating, error } = this.props;

    if (!hasAuthenticated) {
      return null;
    }

    if (isAuthenticating || error) {
      return <Redirect to={{pathname: '/login'}} error={error}/>;
    }

    return <Redirect to={{pathname: '/'}}/>;
  }
}

const mapStateToProps = (state) => {
  return {
    hasAuthenticated: state.hasAuthenticated,
    isAuthenticating: state.isAuthenticating,
    error: state.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    receiveAuth: (authToken) => { dispatch(receiveAuth(authToken)) }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AuthSuccess));
