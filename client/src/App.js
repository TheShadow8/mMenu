import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './actions/authActions';


import { Provider } from 'react-redux';
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';

import Landing from './components/layout/Landing';
import Menuboard from './components/layout/Menuboard';


import './App.css';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for exprired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // TODO clear current profile

    // Redirect to home page
    window.location.href = '/';
  }

}



class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/" component={Landing} />
            <Switch>
              <PrivateRoute exact path="/menuboard" component={Menuboard} />
            </Switch>
          </div>
        </Router>
      </Provider>

    );
  }
}

export default App;
