import React from 'react';
import Comment from './Comment';

function CommentList(props) {
  const { comments, postId } = props;

  return comments.map(comment => <Comment key={comment._id} comment={comment} postId={postId} />);
}

export default CommentList;
