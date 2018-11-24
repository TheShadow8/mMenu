import React from 'react';
import CommentList from './CommentList';

function Post(props) {
  const { posts } = props;

  console.log(props.posts);

  return posts.map(post => (
    <div className="col-12 align-self-center" key={post._id}>
      <img className="img-thumbnail" src={post.imagePath} />
      <h4>
        {post.name}: {post.text}
      </h4>
      <div>{post.likes.length} Likes</div>
      <CommentList comments={post.comments} postId={post._id} />
      <hr />
    </div>
  ));
}

export default Post;
