import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import propTypes from 'prop-types';

import {logoutUser} from '../../actions/authActions';

import Notification from '../Notification/Notification';

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark mt-3 mb-5" style={{backgroundColor: '#222'}}>
        <Link className="navbar-brand" to="/">
          <i className="fab fa-monero fa-2x" />
          menu
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarColor03"
          aria-controls="navbarColor03"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarColor03">
          <form className="form-inline ml-auto">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
          </form>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/addpost">
                <button className="btn">Add Post</button>
              </Link>
            </li>
            {/* <li className="nav-item">
              <a className="nav-link" href="">
                <i className="far fa-compass fa-2x" />
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="">
                <i className="far fa-heart fa-2x" />
              </a>
            </li> */}
            <Notification />
            <li className="nav-item">
              <Link className="nav-link" to="/profile">
                <i className="far fa-user fa-2x" />
              </Link>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="" onClick={this.onLogoutClick.bind(this)} title="Logout">
                <i className="fas fa-sign-out-alt fa-2x" />
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: propTypes.func.isRequired,
};

// const mapPropsToState = state => ({
//   user: state.auth.user
// });

export default connect(
  null,
  {logoutUser},
)(Navbar);
