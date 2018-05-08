import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAuth } from '../actions';

import { Redirect } from 'react-router-dom';

class Login extends Component {
  componentWillMount() {
    this.props.fetchAuth();
  }

  render () {
    return null;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAuth: () => { dispatch(fetchAuth()) }
  };
};

export default connect(null, mapDispatchToProps)(Login);
