import React, {Component} from 'react';
import PropTypes from 'prop-types';

import PostThumbs from '../Posts/PostThumbs/PostThumbs';

export class UserPostList extends Component {
  render() {
    const {userPosts, loading} = this.props;
    let postContent;

    if (userPosts === null || loading || Object.keys(userPosts).length === 0) {
      postContent = null;
    } else {
      postContent = <PostThumbs className="row" posts={userPosts} />;
    }

    return <div>{postContent}</div>;
  }
}

UserPostList.propTypes = {
  userPosts: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default UserPostList;
