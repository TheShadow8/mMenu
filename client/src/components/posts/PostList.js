import React, { Component } from 'react';
import Post from './Post';
import Spinner from '../common/Spinner';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/postActions';
export class PostList extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { posts, loading } = this.props.post;
    let postContent;

    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <Post posts={posts} />;
    }

    return <div className="row">{postContent}</div>;
  }
}

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts }
)(PostList);
