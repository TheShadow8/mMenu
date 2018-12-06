import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getPost, deletePost} from '../../actions/postActions';

import CommentList from './CommentList';
import Likes from './Likes';
import CommentForm from './CommentForm';

export class PostItem extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }

  onDeleteClick = postId => {
    this.props.deletePost(postId, this.props.history);
  };
  render() {
    const {post, loading} = this.props.post;

    let postContent;

    if (post === null || loading || Object.keys(post).length === 0) {
      postContent = null;
    } else {
      postContent = (
        <div className=" col-sm-12 align-self-center text-white ">
          <img className="img-thumbnail mx-auto d-block " src={post.imagePath} alt="" />

          <h3 className="mt-1">
            {post.title}
            {post.user === this.props.auth.user._id ? (
              <button type="button" onClick={() => this.onDeleteClick(post._id)} className="btn btn-danger mr-1">
                <i className="fas fa-times" />
              </button>
            ) : null}
          </h3>
          <h6>
            by <span className="lead">{post.name}</span>
          </h6>
          <h6>{post.content}</h6>
          <Likes post={post} />
          <CommentForm postId={post._id} />
          <CommentList comments={post.comments} postId={post._id} />
        </div>
      );
    }

    return <div>{postContent}</div>;
  }
}

PostItem.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  {getPost, deletePost},
)(PostItem);
