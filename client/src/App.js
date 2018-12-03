import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {setCurrentUser} from './actions/authActions';

import {Provider} from 'react-redux';
import store from './store';

import PrivateRoute from './components/Common/PrivateRoute';
import ScrollToTop from './utils/ScrollToTop';

import Landing from './components/Layout/Landing';
import Menuboard from './components/Layout/Menuboard';
import AddPost from './components/Posts/AddPost';
import PostItem from './components/Posts/PostItem';
import Profile from './components/Profile/Profile';

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
          <ScrollToTop>
            <Route exact path="/" component={Landing} />
            <div className="App">
              <div className="container">
                <Switch>
                  <PrivateRoute exact path="/menuboard" component={Menuboard} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/addpost" component={AddPost} />
                </Switch>

                <Switch>
                  <PrivateRoute exact path="/post/:id" component={PostItem} />
                </Switch>

                <Switch>
                  <PrivateRoute exact path="/profile" component={Profile} />
                </Switch>
              </div>
            </div>
          </ScrollToTop>
        </Router>
      </Provider>
    );
  }
}

export default App;
