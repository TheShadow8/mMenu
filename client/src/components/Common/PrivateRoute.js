import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../../utils/setAuthToken';
import store from '../../store';
import { setCurrentUser, getCurrentUserProfile, logoutUser } from '../../actions/authActions';
import Navbar from '../Layout/Navbar';

let decoded;
class PrivateRoute extends Component {
  componentDidMount() {
    // Check for token
    if (localStorage.jwtToken) {
      // Set auth token header auth
      setAuthToken(localStorage.jwtToken);
      // Decode token and get user
      decoded = jwt_decode(localStorage.jwtToken);
      // Set user and isAuthenticated
      store.dispatch(setCurrentUser(decoded));

      // Get current user profile
      store.dispatch(getCurrentUserProfile(decoded._id));
    }
  }

  componentDidUpdate() {
    // Check for exprired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      store.dispatch(logoutUser());
    }
  }

  render() {
    const { component: Component, auth, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props =>
          auth.isAuthenticated === true ? (
            <div>
              <Navbar />
              <Component {...props} />
            </div>
          ) : (
            <Redirect to="/" />
          )
        }
      />
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(PrivateRoute);
