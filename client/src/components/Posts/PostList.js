import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getPosts} from '../../actions/postActions';

import PostThumbs from './PostThumbs/PostThumbs';

export class PostList extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const {posts, loading} = this.props.post;
    let postContent;

    if (posts === null || loading || Object.keys(posts).length === 0) {
      postContent = null;
    } else {
      postContent = <PostThumbs className="row" posts={posts} />;
    }

    return <div>{postContent}</div>;
  }
}

PostList.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  post: state.post,
});

export default connect(
  mapStateToProps,
  {getPosts},
)(PostList);
