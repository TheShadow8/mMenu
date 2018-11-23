import React from 'react';

function Post(props) {
  const { posts } = props;

  return posts.map(post => {
    return (
      <div className="col-12 align-self-center" key={post._id}>
        <img className="img-thumbnail" src={post.imagePath} />
        <h4>
          {post.name}: {post.text}
        </h4>
        <div>{post.likes.length} Likes</div>
        <hr />
        <h5 />
      </div>
    );
  });
}

export default Post;
