import React, { Component } from 'react';
import PostList from '../posts/PostList';

class Menuboard extends Component {
  render() {
    return (
      <div className="container">
        <PostList />
      </div>
    );
  }
}
export default Menuboard;
