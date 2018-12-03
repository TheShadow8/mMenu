import React, {Component} from 'react';

import PostList from '../Posts/PostList';

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
