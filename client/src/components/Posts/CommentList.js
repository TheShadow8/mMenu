import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

function CommentList(props) {
  const {comments, postId} = props;

  return comments.map(comment => <Comment key={comment._id} comment={comment} postId={postId} />);
}

CommentList.propTypes = {
  postId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
};

export default CommentList;
