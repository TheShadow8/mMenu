import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {getUserPosts} from '../../actions/postActions';

import PostThumbs from '../Posts/PostThumbs/PostThumbs';

export class UserPostList extends Component {
  componentDidMount() {
    this.props.getUserPosts(this.props.auth.user.id);
  }

  render() {
    const {userPosts, loading} = this.props.post;
    let postContent;

    if (userPosts === null || loading || Object.keys(userPosts).length === 0) {
      postContent = null;
    } else {
      postContent = <PostThumbs posts={userPosts} />;
    }

    return <div className="row">{postContent}</div>;
  }
}

UserPostList.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  getUserPosts: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post,
});

export default connect(
  mapStateToProps,
  {getUserPosts},
)(UserPostList);
