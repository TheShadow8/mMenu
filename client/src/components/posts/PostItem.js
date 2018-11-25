import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPost } from '../../actions/postActions';
import { Link } from 'react-router-dom';

import CommentList from './CommentList';
import Likes from './Likes';
import CommentForm from './CommentForm';

export class PostItem extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }

  render() {
    const { post, loading } = this.props.post;

    let postContent;

    if (post === null || loading || Object.keys(post).length === 0) {
      postContent = null;
    } else {
      postContent = (
        <div className="row">
          <Link to="/">
            <i className="fas fa-long-arrow-alt-left fa-lg text-dark" />
          </Link>
          <div className=" col-sm-12 align-self-center ">
            <img className="img-thumbnail mx-auto d-block w-75 w-75" src={post.imagePath} alt="" />

            <h3 className="mt-1">{post.title}</h3>
            <h6>
              by <span className="lead">{post.name}</span>
            </h6>
            <pre>{post.content} </pre>
            <Likes post={post} />
            <CommentForm postId={post._id} />
            <CommentList comments={post.comments} postId={post._id} />
          </div>
        </div>
      );
    }

    return <div className="container">{postContent}</div>;
  }
}

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPost }
)(PostItem);
