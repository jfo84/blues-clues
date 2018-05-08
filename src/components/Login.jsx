import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAuth } from '../actions';

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
