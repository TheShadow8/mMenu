import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';

import PrivateRoute from './components/Common/PrivateRoute';
import ScrollToTop from './utils/ScrollToTop';

import Landing from './components/Layout/Landing';
import Menuboard from './components/Layout/Menuboard';
import AddPost from './components/Posts/AddPost';
import PostItem from './components/Posts/PostItem';
import MyProfile from './components/Profile/MyProfile';
import Profile from './components/Profile/Profile';

import './App.css';

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
                  <PrivateRoute exact path="/profile" component={MyProfile} />
                </Switch>

                <Switch>
                  <PrivateRoute exact path="/profile/:id" component={Profile} />
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
