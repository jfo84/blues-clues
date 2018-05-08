import React, { Component } from 'react';
import { connect } from 'react-redux';
import { receiveAuth } from '../actions';
import { Redirect, withRouter } from 'react-router-dom';

const parseQuery = (queryString) => {
  var query = {};
  var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
  for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i].split('=');
      query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }
  return query;
}

class AuthSuccess extends Component {
  componentWillMount() {
    const paramsString = this.props.location.hash.substring(1);
    const params = parseQuery(paramsString);

    const authToken = params['access_token'];
    const error = params['error'];

    this.setState({ authToken, error });

    this.props.receiveAuth(authToken);
  }

  render() {
    const { authToken, error } = this.state;

    if (!authToken || error) {
      return <Redirect to={{pathname: '/login'}} error={error}/>;
    }

    return <Redirect to={{pathname: '/'}}/>;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    receiveAuth: (authToken) => { dispatch(receiveAuth(authToken)) }
  };
};

export default connect(null, mapDispatchToProps)(withRouter(AuthSuccess));
