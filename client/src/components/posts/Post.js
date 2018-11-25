import React from 'react';
import CommentList from './CommentList';
import Likes from './Likes';
import CommentForm from './CommentForm';

function Post(props) {
  const { posts } = props;

  return posts.map(post => (
    <div className="col-12 align-self-center" key={post._id}>
      <img className="img-thumbnail" src={post.imagePath} alt="" />
      <p>
        <span className="lead">{post.name}:</span> {post.text}
      </p>
      <Likes post={post} />
      <CommentForm postId={post._id} />
      <CommentList comments={post.comments} postId={post._id} />
      <hr />
    </div>
  ));
}

export default Post;
