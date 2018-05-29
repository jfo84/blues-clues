import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAuthCallback, failAuth } from '../actions';
import { 
  Redirect,
  Link,
  withRouter
} from 'react-router-dom';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Error = styled.h2`
  flex: 1;
  color: #DC143C;
`;

const FlexLink = styled(Link)`
  & {
    flex: 1;
  }
`;

class Auth extends Component {
  componentWillMount() {
    const paramsString = this.props.location.search;
    const params = this.parseQuery(paramsString);
    const cookie = document.cookie;
    const cookieParams = this.parseQuery(cookie);

    const state = params['state'];
    const error = params['error'];

    // Bail out on error and trigger a re-render
    if (error) {
      this.setState({ error });
      return;
    } else {
      this.setState({ error: null });
    }

    if (cookieParams['spotify_auth_state'] === state) {
      this.props.handleAuthCallback();
    } else {
      // This should only happen due to a bad actor so we hard fail
      this.props.failAuth();
    }
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
    const { hasAuthenticated, isAuthenticating } = this.props;
    const { error } = this.state;

    if (!hasAuthenticated) {
      return null;
    }

    if (isAuthenticating || error) {
      return(
        <ErrorContainer>
          <Error>{error}</Error>
          <FlexLink to='/login' />
        </ErrorContainer>
      );
    }

    return <Redirect to={{pathname: '/'}}/>;
  }
}

const mapStateToProps = (state) => {
  return {
    hasAuthenticated: state.hasAuthenticated,
    isAuthenticating: state.isAuthenticating
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleAuthCallback: () => { dispatch(handleAuthCallback()) },
    failAuth: () => { dispatch(failAuth()) }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Auth));
