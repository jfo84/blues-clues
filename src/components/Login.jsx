import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAuth } from '../actions';

import { Redirect } from 'react-router-dom';

class Login extends Component {
  componentWillMount() {
    this.props.fetchAuth();
  }

  render () {
    const { authenticated, errorMessage } = this.props;
    return (
      authenticated ? (
        <Redirect to={{pathname: "/tracks"}}/>
      ) : (
        <div>
          {errorMessage ? <p>{errorMessage}</p> : null}
        </div>
      )
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.authenticated,
    errorMessage: state.errorMessage
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAuth: () => { dispatch(fetchAuth()) }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
