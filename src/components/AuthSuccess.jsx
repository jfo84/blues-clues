import React, { Component } from 'react';
import { connect } from 'react-redux';
import { receiveAuth } from '../actions';
import { Redirect } from 'react-router-dom';

import queryString from 'query-string';

class AuthSuccess extends Component {
  componentWillMount() {
    const params = queryString.parse(this.props.location.search);
    const authToken = params['auth_token'];
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
    receiveAuth: () => { dispatch(receiveAuth()) }
  };
};

export default connect(null, mapDispatchToProps)(AuthSuccess);
