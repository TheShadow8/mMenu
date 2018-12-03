import React, {Component} from 'react';

import './Landing.css';
import Login from '../Auth/Login';
import Register from '../Auth/Register';

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <Login />
          <Register />
        </div>
      </div>
    );
  }
}

export default Landing;
