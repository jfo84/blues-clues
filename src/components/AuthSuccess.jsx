import React, { Component } from 'react';
import { connect } from 'react-redux';
import { receiveAuth } from '../actions';

import qs from 'query-string';

class AuthSuccess extends Component {
  componentWillMount() {
    const params = qs.parse(this.props.location.search);

    this.props.receiveAuth(params['auth_token']);
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    receiveAuth: () => { dispatch(receiveAuth()) }
  };
};

export default connect(null, mapDispatchToProps)(AuthSuccess);
