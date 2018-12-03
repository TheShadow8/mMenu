import React, {Component} from 'react';
import Posts from './Posts';
import {connect} from 'react-redux';
import {getPosts} from '../../actions/postActions';
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
      postContent = <Posts className="row" posts={posts} />;
    }

    return <div>{postContent}</div>;
  }
}

const mapStateToProps = state => ({
  post: state.post,
});

export default connect(
  mapStateToProps,
  {getPosts},
)(PostList);
