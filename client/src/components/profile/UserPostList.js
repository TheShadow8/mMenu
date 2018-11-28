import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserPosts } from '../../actions/postActions';

import Spinner from '../common/Spinner';
import UserPosts from './UserPosts';

export class UserPostList extends Component {
  componentDidMount() {
    this.props.getUserPosts(this.props.auth.user.id);
  }

  render() {
    console.log(this.props.post.userPosts);
    const { userPosts, loading } = this.props.post;
    let postContent;

    if (userPosts === null || loading || Object.keys(userPosts).length === 0) {
      postContent = (
        <div className="col-12 align-self-center">
          <Spinner />
        </div>
      );
    } else {
      postContent = <UserPosts userPosts={userPosts} />;
    }

    return <div className="row">{postContent}</div>;
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post
});

export default connect(
  mapStateToProps,
  { getUserPosts }
)(UserPostList);
