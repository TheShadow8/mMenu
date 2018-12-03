import React, {Component} from 'react';
import propTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import {loginUser} from '../../actions/authActions';

import TextFieldGroup from '../Common/TextFieldGroup';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/menuboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/menuboard');
    }

    if (nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(userData);
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }
  render() {
    const {errors} = this.state;
    return (
      <nav className="navbar navbar-lg navbar-expand-lg navbar-transparant navbar-dark login-nav">
        <a className="navbar-brand mb-2" href="/">
          {' '}
          <i className="fab fa-monero fa-2x" /> menu
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav ml-auto">
            <form className="row" onSubmit={this.onSubmit}>
              <TextFieldGroup label="Email:" placeholder="Email Address" name="email" type="email" value={this.state.email} onChange={this.onChange} error={errors.email} />

              <TextFieldGroup label="Password:" placeholder="Password" name="password" type="password" value={this.state.password} onChange={this.onChange} error={errors.password} />

              <div className="m-auto">
                <button type="submit" className="btn btn-success">
                  Sign in
                </button>
              </div>
            </form>
          </ul>
        </div>
      </nav>
    );
  }
}

Login.propTypes = {
  loginUser: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  errors: propTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(
  mapStateToProps,
  {loginUser},
)(withRouter(Login));
